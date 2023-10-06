import { API_URL } from '$env/static/private';
import { json, redirect } from '@sveltejs/kit';

const user_id = '6aff0bb1-f162-40bc-b2d2-13179725cdd3';

export async function load({ cookies }: any) {
	// const response = await prisma.project.findMany();

	const jwt = cookies.get('jwt');

	console.log(jwt);
	if (jwt) {
		const response = await fetch(`${API_URL}/Projects`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});

		const data = await response.json();
		console.log(data);
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

		console.log(res);

	    return { success: true }
	}
};
