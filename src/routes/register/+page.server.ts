import { API_URL } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	register: async ({ request }: any) => {
		const data = await request.formData();

		const username = data.get('username');
		const email = data.get('email');
		const password = data.get('password');

		if (!email || !password) {
			return fail(400, { email, message: 'All fields are required' });
		}

		const register_data = {
			username: username,
			email: email,
			password: password
		};

		const response = await fetch(`${API_URL}/Account/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(register_data)
		});

		if (!response.ok) {
			const res = await response.json();
			let errors = '';

			for (let errorType in res.errors) {
				const errorMessages = res.errors[errorType].join(', ');
				errors += `${errorType}: ${errorMessages}\n`;
			}

			return fail(400, { email, message: `${errors}` });
		}

		throw redirect(303, '/login');
	}
};
