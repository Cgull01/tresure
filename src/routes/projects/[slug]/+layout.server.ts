import { API_URL } from "$env/static/private";
import { redirect } from "@sveltejs/kit";

export const ssr = false;

export async function load({ params, cookies }: any) {
	// const response = await fetch(`https://localhost:7203/api/Projects/${params.slug}`);
	const jwt = cookies.get('jwt');

	if (jwt) {
		const response = await fetch(`${API_URL}/Projects/${params.slug}`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});

		const data = await response.json();
		for (let col of data.columns) {
			for (let card of col.cards) {
				try {
					card.tags = JSON.parse(card.tags);
				} catch {
					card.tags = [];
				}
			}
		}

		const userJson = await fetch(`${API_URL}/currentUser`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});

		const user = await userJson.json();

		return { project: data, user: user, params:params };
	}

	throw redirect(308, '/login');
}