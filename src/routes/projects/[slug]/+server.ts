import prisma from '$lib/server/prisma';
import type { IColumn, IProject } from '$lib/types';
import { json } from '@sveltejs/kit';

export async function PATCH({ request }: any) {

    const { task_ID, destinationColumn_ID, task_position } = await request.json();

    const response = await prisma.task.update({
        where: { id: task_ID },
        data: { columnId: destinationColumn_ID, position: task_position }

    });

    return json(response);
}
export async function GET({ params }: any) {
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
            return json('project not found');
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

        return json(project);
    } catch (err) {
        console.error(err);
        return json('Error fetching project data');
    }
}