import { API_URL } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request }: any) => {
		const data = await request.formData();

		const email = data.get('email');
		const password = data.get('password');

		if (!email || !password) {
			return fail(400, { email, message: 'Missing email or password' });
		}

		const login_data = { Email: email, Password: password };

		const response = await fetch(`${API_URL}/Account/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(login_data)
		});

		if (!response.ok) {
			return fail(400, { email, message: 'Missing email or password' });

			return fail(response.status, { email, message: response.statusText });
		}

		throw redirect(303, '/projects');
	}
};
