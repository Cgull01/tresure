import { API_URL } from '$env/static/private';
import { json, redirect } from '@sveltejs/kit';

export async function load({ cookies }: any) {
	// const response = await prisma.project.findMany();

	const jwt = cookies.get('jwt');

	if (jwt) {
		const response = await fetch(`${API_URL}/Projects`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});

		const data = await response.json();

		return { projects: data };
	}

	throw redirect(308, '/login');
}

export const actions = {
	createProject: async ({ request, cookies }: any) => {
	    const data = await request.formData();
	    const projectTitle = data.get('project_title');

		const jwt = cookies.get('jwt');

		const response = await fetch(`${API_URL}/Projects`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${jwt}`
			},
			body: JSON.stringify({"Title":projectTitle})
		});

		const res = await response.json();

	    return { success: true }
	}
};
