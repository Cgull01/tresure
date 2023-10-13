import { browser } from '$app/environment';
import { API_URL } from '$env/static/private';
import { fail, json, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, cookies }: any) => {
		const form_data = await request.formData();

		const email = form_data.get('email');
		const password = form_data.get('password');

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
			return fail(400, { email, message: 'Wrong credentials' });

		}

		let data = await response.json();

		if(data.token)
		{
			cookies.set('jwt', data.token, {
				httpOnly: false,
				secure: true,
				sameSite: 'lax',
				path: '/'
			});

			throw redirect(303, '/projects');
		}
		else
		{
			return fail(400, { email, message: 'token missing' });

		}

	}
};
