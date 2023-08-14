import prisma from '$lib/server/prisma';
import type { IColumn, IProject, ITask } from '$lib/types.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params }: any) {

    try {
        const response = await prisma.project.findFirst({
            where: {
                id: params.slug
            },
            include: {
                columns: {
                    include: {
                        tasks: true,
                    }
                }
            }
        });

        if (!response) {
            return { status: 404, body: { error: 'Project not found' } };
        }

        const project: IProject = {
            id: response.id,
            title: response.title,
            columns: response.columns.map(col => ({
                id: col.id,
                title: col.title,
                project_id: col.projectId,
                position: col.position,
                tasks: col.tasks.map(task => ({
                    id: task.id,
                    title: task.title || '',
                    details: task.details || '',
                    dueDate: task.dueDate,
                    position: task.position,
                    tags: task.tags as { color: string; tag: string }[]
                })).sort((a, b) => a.position - b.position)
            })) as IColumn[]
        };

        project.columns.sort((a, b) => a.position - b.position)

        return { project: project };
    } catch (err) {
        return { status: 500, body: { error: 'Error fetching project data' } };
    }
}


export const actions = {

    createTask: async ({ request }: any) => {
        const data = await request.formData();

        const task_json = data.get('task') as string;
        const column_id = data.get('column_id');
        const task: ITask = JSON.parse(task_json);

        await prisma.task.create({
            data: {
                title: task.title,
                details: task.details,
                dueDate: task.dueDate,
                tags: task.tags,
                position: task.position,

                column: {
                    connect: {
                        id: column_id,
                    }
                }
            },
        })

        return { success: true }
    },
    editTask: async ({ request }: any) => {
        const data = await request.formData();

        const task_json = data.get('task') as string;
        const task: ITask = JSON.parse(task_json);

        await prisma.task.update({
            where: { id: task.id },
            data: {
                title: task.title,
                details: task.details,
                dueDate: task.dueDate,
                position: task.position,
                tags: task.tags ?? JSON.parse(task.tags || ''),
            }
        })

        return { success: true }
    },
    deleteTask: async ({ request }: any) => {
        const data = await request.formData();
        let payload: any = {};
        payload.id = data.get('task_id');

        await prisma.task.delete({
            where: payload,
        })

        return { success: true }
    },
    editProject: async ({ request }: any) => {
        const data = await request.formData();

        const project_id = data.get('project_id');
        const project_title = data.get('project_title');

        if (project_title.length <= 0)
            return;

        await prisma.project.update({
            where: { id: project_id },
            data: { title: project_title }
        })


        return { success: true }
    },
    deleteProject: async ({ request }: any) => {
        const data = await request.formData();

        const project_id = data.get('project_id');

        await prisma.project.delete({
            where: { id: project_id }
        });

        throw redirect(303, '/')

    },
    renameColumn: async ({ request }: any) => {
        const data = await request.formData();

        const column_id = data.get('column_id');
        const column_title = data.get('column_title');

        await prisma.column.update({
            where: { id: column_id },
            data: { title: column_title }
        });
        return { success: true }

    },
    deleteColumn: async ({ request }: any) => {
        const data = await request.formData();

        const column_id = data.get('column_id');

        await prisma.column.delete({
            where: { id: column_id }
        });
        return { success: true }

    },
    addColumn: async ({ request }: any) => {
        const data = await request.formData();

        const project_id = data.get('project_id');
        const column_position = parseInt(data.get('column_position'));

        await prisma.column.create({
            data: {
                title: 'New Column',
                projectId: project_id,
                position: column_position,
            }
        });
        return { success: true }

    }
}
