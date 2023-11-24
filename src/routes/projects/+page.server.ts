import { API_URL } from '$env/static/private';
import { fail, json, redirect } from '@sveltejs/kit';

export async function load({ cookies }: any) {
	// const response = await prisma.project.findMany();

	const jwt = cookies.get('jwt');

	if (jwt) {
		const response = await fetch(`${API_URL}/Project`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});

		const user = await fetch(`${API_URL}/currentUser`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});

		if (response.ok && user.ok) {
			const project_data = await response.json();
			const user_data = await user.json();

			return { projects: project_data, user: user_data };
		} else {
			return fail(400);
		}
	}

	throw redirect(308, '/login');
}

export const actions = {
	createProject: async ({ request, cookies }: any) => {
		const data = await request.formData();
		const projectTitle = data.get('project_title');

		const jwt = cookies.get('jwt');

		const response = await fetch(`${API_URL}/Project`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${jwt}`
			},
			body: JSON.stringify({ Title: projectTitle })
		});

		return { success: true };
	}
};
