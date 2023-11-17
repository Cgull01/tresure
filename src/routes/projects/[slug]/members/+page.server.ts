import { invalidateAll } from '$app/navigation';
import { API_URL } from '$env/static/private';
import type { IColumn, IProject, ICard } from '$lib/types.js';
import { fail, json, redirect } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;

// export async function load({ params, cookies }: any) {
// 	// const response = await fetch(`https://localhost:7203/api/Projects/${params.slug}`);
// 	const jwt = cookies.get('jwt');

// 	if (jwt) {
// 		const response = await fetch(`${API_URL}/Projects/${params.slug}`, {
// 			headers: {
// 				Authorization: `Bearer ${jwt}`
// 			}
// 		});

// 		const data = await response.json();
// 		for (let col of data.columns) {
// 			for (let card of col.cards) {
// 				try {
// 					card.tags = JSON.parse(card.tags);
// 				} catch {
// 					card.tags = [];
// 				}
// 			}
// 		}

// 		const userJson = await fetch(`${API_URL}/currentUser`, {
// 			headers: {
// 				Authorization: `Bearer ${jwt}`
// 			}
// 		});

// 		const user = await userJson.json();

// 		return { project: data, user: user };
// 	}

// 	throw redirect(308, '/login');
// }

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
			console.log(userData)
			return { user: userData };
		} catch (err: any) {
			return { error: err.message };
		}
	}
};
