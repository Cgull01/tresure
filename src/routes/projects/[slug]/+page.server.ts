import prisma from '$lib/server/prisma';
import type { IProject } from '$lib/types.js';
import { error, redirect } from '@sveltejs/kit';
import { GET } from './+server';

export async function load({ params }: any) {

    const response = await GET({ params });

    if (response.status === 200) {
        const result = await response.json();
        return { "project": result, "slug": params.slug };
    } else {
        throw new Error('no project found');
    }
}


export const actions = {

    createTask: async ({ request }: any) => {
        const data = await request.formData();
        let payload: any = {};

        const task_title = data.get('task_title') as string;
        if (task_title)
            payload.title = task_title;

        const task_details = data.get('task_details') as string;
        if (task_details)
            payload.details = task_details;

        const dueDateString = data.get('due_date') as string;
        if (dueDateString)
            payload.dueDate = new Date(dueDateString).toISOString();

        const tagJSON = data.get('tags');
        if (tagJSON)
            payload.tags = JSON.parse(tagJSON as string);

        const columnID = data.get('columnID') as string;
        if (columnID) {
            payload.column = {
                connect: {
                    id: columnID
                }
            }
        }

        await prisma.task.create({
            data: payload,
        })

        return { success: true }
    },
    editTask: async ({ request }: any) => {
        const data = await request.formData();
        let payload: any = {};
        let taskID = data.get('task_id') as string;

        const task_title = data.get('task_title') as string;
        if (task_title)
            payload.title = task_title;

        const task_details = data.get('task_details') as string;
        if (task_details)
            payload.details = task_details;

        const tagJSON = data.get('tags');
        if (tagJSON)
            payload.tags = JSON.parse(tagJSON as string);

        const columnID = data.get('columnID') as string;
        if (columnID) {
            payload.column = {
                connect: {
                    id: columnID
                }
            }
        }

        await prisma.task.update({
            where: { id: taskID },
            data: payload
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
    }


}
