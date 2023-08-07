import prisma from '$lib/server/prisma';
import type { IProject } from '$lib/types';
import { json } from '@sveltejs/kit';

export async function PATCH({ request }: any) {

    const { task_ID, destinationColumn_ID } = await request.json();

    const response = await prisma.task.update({
        where: { id: task_ID },
        data: { columnId: destinationColumn_ID }

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
                projectId: col.projectId,
                tasks: col.tasks.map(task => ({
                    id: task.id,
                    title: task.title || '',
                    details: task.details || '',
                    dueDate: task.dueDate,
                    tags: task.tags as { color: string; tag: string }[]
                }))
            }))
        };

        return json(project);
    } catch (err) {
        console.error(err);
        return json('Error fetching project data');
    }
}