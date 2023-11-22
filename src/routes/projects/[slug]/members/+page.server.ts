import { invalidateAll } from '$app/navigation';
import { API_URL } from '$env/static/private';
import type { IColumn, IProject, ICard } from '$lib/types.js';
import { fail, json, redirect } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;


export const actions = {
	findUser: async ({ request, cookies }: any) => {
		try {
			const data = await request.formData();
			const email = data.get('user_email');
			const jwt = cookies.get('jwt');

			const response = await fetch(`${API_URL}/user?userEmail=${email}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${jwt}`
				}
			});

			if (!response.ok) {
				throw new Error('Failed to fetch user data');
			}

			const userData = await response.json();
			console.log(userData);
			return { user: userData };
		} catch (err: any) {
			return { error: err.message };
		}
	},
	addMember: async ({ request, cookies, params }: any) => {
		try {
			const data = await request.formData();
			const user_id = data.get('user_id');
			const jwt = cookies.get('jwt');

			const parseData = {
				userId: user_id,
				projectId: params.slug
			};
			console.log(parseData);

			const response = await fetch(`${API_URL}/Member`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${jwt}`
				},
				body: JSON.stringify(parseData)
			});

			return { success: true };
		} catch (err: any) {
			return { error: err.message };
		}
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
	deleteProject: async ({ request, cookies }: any) => {
		const data = await request.formData();

		const project_id = data.get('project_id');

		const jwt = cookies.get('jwt');

		const response = await fetch(`${API_URL}/Project/${project_id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${jwt}`
			}
		});

		throw redirect(303, '/projects');
	},

	editMember: async ({ request, cookies }: any) => {
		const data = await request.formData();
		const member_id = data.get('member_id');
		const newRole = data.get('role_admin') || data.get('role_taskMaster');
		const jwt = cookies.get('jwt');

		const parseData = {
			id: member_id,
			role: newRole
		};

		console.log(parseData);

		const response = await fetch(`${API_URL}/Member/${member_id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${jwt}`
			},
			body: JSON.stringify(parseData)
		});

		if (!response.ok) {
			const res = await response.json();

			console.log(res);
		}

		return { success: true };
	},
	removeMember: async ({ request, cookies }: any) => {
		const data = await request.formData();
		const member_id = data.get('member_id');
		const jwt = cookies.get('jwt');

		const response = await fetch(`${API_URL}/Member/${member_id}`, {
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
