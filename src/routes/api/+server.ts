import { API_URL } from '$env/static/private';
import { formatData } from '$lib/functions';
import type { Roles, ICard, IColumn, IMember, IProject, UserRoles } from '$lib/types';
import { error, json, redirect } from '@sveltejs/kit';

// card drag event
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


	const response = await fetch(`${API_URL}/api/Card/${card.id}`, {
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

export async function GET({ url, cookies }: any) {
	const jwt = cookies.get('jwt');

	const slug = url.searchParams.get('project');

	if (jwt) {
		const response = await fetch(`${API_URL}/api/Project/${slug}`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});

		if (!response.ok) throw error(404, 'Error loading project data');

		let data: IProject = await response.json();

		if (!data) return error(422, 'Failed to Process project data');

		const userJson = await fetch(`${API_URL}/api/currentUser`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});

		const user = await userJson.json();

		const user_member = data.members.find((m: IMember) => m.user.username === user.username);
		const user_memberId = user_member?.id;

		return json({ project: data, user: { ...user, member_id: user_memberId } });
	}

	throw redirect(308, '/login');
}
