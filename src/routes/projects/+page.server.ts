import { json } from '@sveltejs/kit';

const user_id = '6aff0bb1-f162-40bc-b2d2-13179725cdd3'

export async function load() {
    // const response = await prisma.project.findMany();

    const response = await fetch("https://localhost:7203/api/Projects");
    const data = await response.json();
    console.log(data);
    return { projects: data };

}

export const actions = {
    // createProject: async ({ request }: any) => {
    //     const data = await request.formData();
    //     const project_title = data.get('project_title');
    //     await prisma.project.create({
    //         data: {
    //             title: project_title!.toString(),
    //             userId: user_id,
    //             columns: {
    //                 create: [
    //                     { title: 'To do', position: 1 },
    //                     { title: 'Doing', position: 2 },
    //                     { title: 'Done', position: 3 },
    //                 ],
    //             },
    //         }
    //     });

    //     return { success: true }
    // }

}
