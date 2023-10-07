import { invalidateAll } from '$app/navigation';
import { API_URL } from '$env/static/private';
import type { IColumn, IProject, ICard } from '$lib/types.js';
import { json, redirect } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;


export async function load({ params, cookies }: any) {
	// const response = await fetch(`https://localhost:7203/api/Projects/${params.slug}`);
	const jwt = cookies.get('jwt');

	if(jwt)
	{
		const response = await fetch(`${API_URL}/Projects/${params.slug}`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});

		const data = await response.json();
		for(let col of data.columns)
		{
			for(let card of col.cards)
			{
				try
				{
					card.tags = JSON.parse(card.tags)
				}
				catch
				{
					card.tags = [];
				}
			}
		}
		return { project: data };
	}

	throw redirect(308, '/login');


}

export const actions = {
	createTask: async ({ request, cookies }: any) => {
	    const data = await request.formData();

	    const task_json = JSON.parse(data.get('task'));
	    const column_id = data.get('column_id');

		const jwt = cookies.get('jwt')

		const parseData = {
			"title": task_json.title ?? null,
			"details": task_json.details ?? null,
			"tags": JSON.stringify(task_json.tags) ?? null,
			"dueDate": task_json.dueDate ?? null,
			"creationDate": new Date(),
			"assignedMembers": task_json.assignedMembers ?? null,
			"columnId": column_id
		}

		const response = await fetch(`${API_URL}/Cards`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${jwt}`
			},
			body: JSON.stringify(parseData)
		});

		const res = await response.json();

		return {sucess: true}

	},

	editTask: async ({ request, cookies }: any) => {
		const data = await request.formData();

		const task_json = data.get('task') as string;

		console.log(task_json);

		return { success: true };
	},

	deleteTask: async ({ request, cookies }: any) => {
	    const data = await request.formData();
	    let task_id = data.get('task_id');
		const jwt = cookies.get('jwt')

		console.log(task_id);

		try
		{

			await fetch(`${API_URL}/Cards/${task_id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${jwt}`
				},
			});
		}
		catch(error)
		{
			console.error(`Failed to delete a card: ${error}`)
		}

	    return { success: true }
	},
	// editProject: async ({ request }: any) => {
	//     const data = await request.formData();

	//     const project_id = data.get('project_id');
	//     const project_title = data.get('project_title');

	//     if (project_title.length <= 0)
	//         return;

	//     await prisma.project.update({
	//         where: { id: project_id },
	//         data: { title: project_title }
	//     })

	//     return { success: true }
	// },
	// deleteProject: async ({ request }: any) => {
	//     const data = await request.formData();

	//     const project_id = data.get('project_id');

	//     await prisma.project.delete({
	//         where: { id: project_id }
	//     });

	//     throw redirect(303, '/')

	// },
	// renameColumn: async ({ request }: any) => {
	//     const data = await request.formData();

	//     const column_id = data.get('column_id');
	//     const column_title = data.get('column_title');

	//     await prisma.column.update({
	//         where: { id: column_id },
	//         data: { title: column_title }
	//     });
	//     return { success: true }

	// },
	// deleteColumn: async ({ request }: any) => {
	//     const data = await request.formData();

	//     const column_id = data.get('column_id');

	//     await prisma.column.delete({
	//         where: { id: column_id }
	//     });
	//     return { success: true }

	// },
	// addColumn: async ({ request }: any) => {
	//     const data = await request.formData();

	//     const project_id = data.get('project_id');
	//     const column_position = parseInt(data.get('column_position'));

	//     await prisma.column.create({
	//         data: {
	//             title: 'New Column',
	//             projectId: project_id,
	//             position: column_position,
	//         }
	//     });
	//     return { success: true }

	// }
};
