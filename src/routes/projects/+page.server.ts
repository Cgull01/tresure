import prisma from '$lib/server/prisma';
import { json } from '@sveltejs/kit';

const user_id = '1a7816c1-99c4-4971-a74c-abaebf4cd49d'

export async function load() {
    const response = await prisma.project.findMany();

    return { projects: response };

}

export const actions = {
    createProject: async ({ request }: any) => {
        const data = await request.formData();
        const project_title = data.get('project_title');
        await prisma.project.create({
            data: {
                title: project_title!.toString(),
                userId: user_id,
                columns: {
                    create: [
                        { title: 'To do', position: 1 },
                        { title: 'Doing', position: 2 },
                        { title: 'Done', position: 3 },
                    ],
                },
            }
        });

        return { success: true }
    }

}
