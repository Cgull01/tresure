import { invalidateAll } from '$app/navigation';
import { API_URL } from '$env/static/private';
import type { IColumn, IProject, ICard } from '$lib/types.js';
import { fail, json, redirect } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;

export const actions = {
	createTask: async ({ request, cookies }: any) => {
		const data = await request.formData();

		const task_json = JSON.parse(data.get('task'));

		const jwt = cookies.get('jwt');

		const parseData = {
			title: task_json.title ?? null,
			details: task_json.details ?? null,
			tags: JSON.stringify(task_json.tags) ?? null,
			dueDate: task_json.dueDate ?? null,
			assignedMembers: task_json.assignedMembers ?? null,
			columnId: task_json.columnId
		};

		const response = await fetch(`${API_URL}/Card`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${jwt}`
			},
			body: JSON.stringify(parseData)
		});

		return { sucess: true };
	},

	deleteTask: async ({ request, cookies }: any) => {
		const data = await request.formData();

		let task_id = data.get('task_id');
		const jwt = cookies.get('jwt');

		try {
			await fetch(`${API_URL}/Card/${task_id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${jwt}`
				}
			});
		} catch (error) {
			console.error(`Failed to delete a card: ${error}`);
		}

		return { success: true };
	},

	editProject: async ({ request, cookies, params }: any) => {
		const data = await request.formData();

		const project_title = data.get('project_title');

		const jwt = cookies.get('jwt');

		if (project_title.length <= 0)
			return fail(400, { project_title, message: 'Missing Project Title' });

		const response = await fetch(
			`${API_URL}/Project/${params.slug}?projectTitle=${project_title}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${jwt}`
				}
			}
		);

		return { success: true };
	},
	addColumn: async ({ request, cookies }: any) => {
		const data = await request.formData();

		const project_id = data.get('project_id');

		const jwt = cookies.get('jwt');

		const response = await fetch(`${API_URL}/Column?project_id=${project_id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${jwt}`
			}
		});

		return { success: true };
	},
	editTask: async ({ request, cookies }: any) => {
		const data = await request.formData();
		const jwt = cookies.get('jwt');

		let card_json = JSON.parse(data.get('task'));

		const parseData = {
			id: card_json.id,
			title: card_json.title ?? null,
			details: card_json.details ?? null,
			tags: JSON.stringify(card_json.tags) ?? null,
			dueDate: card_json.dueDate ?? null,
			creationDate: card_json.creationDate ?? null,
			completionDate: card_json.completionDate ?? null,
			approvalDate: card_json.approvalDate ?? null,
			assignedMembers: card_json.assignedMembers ?? null,
			columnId: card_json.columnId
		};

		const response = await fetch(`${API_URL}/Card/${parseData.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${jwt}`
			},
			body: JSON.stringify(parseData)
		});

		if (!response.ok) {
			let ans = await response.json();

			console.warn(ans);
		}
		return { success: true };
	},
	editColumn: async ({ request, cookies }: any) => {
		const data = await request.formData();

		const column_id = data.get('column_id');
		const column_title = data.get('column_title');
		const column_position = data.get('column_position');

		const jwt = cookies.get('jwt');

		const parseData = {
			id: column_id,
			title: column_title ?? '',
			position: column_position
		};

		const response = await fetch(`${API_URL}/Column/${column_id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${jwt}`
			},
			body: JSON.stringify(parseData)
		});

		return { success: true };
	},
	deleteColumn: async ({ request, cookies }: any) => {
		const data = await request.formData();

		const column_id = data.get('column_id');

		const jwt = cookies.get('jwt');

		const response = await fetch(`${API_URL}/Column/${column_id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${jwt}`
			}
		});

		return { success: true };
	}
};
