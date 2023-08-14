import prisma from '$lib/server/prisma';
import type { IColumn, IProject } from '$lib/types';
import { json } from '@sveltejs/kit';

export async function PATCH({ request }: { request: any }) {

    const { task_ID, destinationColumn_ID, task_position } = await request.json();

    const updatedTask = await prisma.task.update({
        where: { id: task_ID },
        data: { columnId: destinationColumn_ID, position: task_position }
    });


    return json(updatedTask);
}
