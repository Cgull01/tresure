import { API_URL } from "$env/static/private";
import { redirect } from "@sveltejs/kit";

export const ssr = false;

export async function load({ params, cookies }: any) {
	// const response = await fetch(`https://localhost:7203/api/Projects/${params.slug}`);
	const jwt = cookies.get('jwt');

	if (jwt) {
		const response = await fetch(`${API_URL}/Project/${params.slug}`, {
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

		for(let i = 0; i < data.columns ;i++)
		{
			data.columns[i] = data.columns[i].cards?.sort((cardA:any, cardB:any) => {
				const dateA = new Date(cardA.creationDate).getTime();
				const dateB = new Date(cardB.creationDate).getTime();
				return dateA - dateB;
			});

		}


		return { project: data, user: user, params:params };
	}

	throw redirect(308, '/login');
}