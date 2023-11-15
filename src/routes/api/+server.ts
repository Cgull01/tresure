import { API_URL } from '$env/static/private';
import type { IColumn, IProject } from '$lib/types';
import { json } from '@sveltejs/kit';

export async function PUT({ request, cookies }: any) {
	const task = await request.json();

	const jwt = cookies.get('jwt');

	console.log("edit task")
	console.log(JSON.stringify(task))

	if(task.tags !== null)
	task.tags = JSON.stringify(task.tags);

	const response = await fetch(`${API_URL}/Card/${task.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${jwt}`
		},
		body: JSON.stringify(task)
	});

	return json(response);
}
