import prisma from '$lib/server/prisma';
import { json } from '@sveltejs/kit';

const userID = '1a7816c1-99c4-4971-a74c-abaebf4cd49d'

export async function load() {
    const response = await prisma.project.findMany();

    return { "projects": response };
}

export const actions = {
    createProject: async ({ request }) => {
        const data = await request.formData();
        const project_title = data.get('project_title');
        await prisma.project.create({
            data: {
                title: project_title!.toString(),
                userId: userID,
                columns: {
                    create: [
                        { title: 'To do' },
                        { title: 'Doing' },
                        { title: 'Done' },
                    ],
                },
            }
        });

        return { success: true }
    }

}
