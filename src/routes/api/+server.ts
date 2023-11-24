import { API_URL } from '$env/static/private';
import type { ICard, IColumn, IProject } from '$lib/types';
import { json } from '@sveltejs/kit';

export async function PUT({ request, cookies }: any) {
	const card = await request.json();

	const jwt = cookies.get('jwt');

	if (card.tags !== null) card.tags = JSON.stringify(card.tags);

	const parseData = {
		id: card.id,
		title: card.title ?? null,
		details: card.details ?? null,
		tags: card.tags ?? null,
		dueDate: card.dueDate ?? null,
		creationDate: card.creationDate ?? null,
		completionDate: card.completionDate ?? null,
		approvalDate: card.approvalDate ?? null,
		assignedMembers: card.assignedMembers ?? null,
		columnId: card.columnId
	};

	const response = await fetch(`${API_URL}/Card/${card.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${jwt}`
		},
		body: JSON.stringify(parseData)
	});

	return json(response);
}
