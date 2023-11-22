import { API_URL } from '$env/static/private';
import { Roles, type UserRoles } from '$lib/types';
import { fail, redirect } from '@sveltejs/kit';

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

				if (card.dueDate) {
					card.dueDate =
						new Date(card.dueDate).getFullYear() > 1000 ? new Date(card.dueDate) : null;
				} else {
					card.dueDate = null;
				}
			}
		}

		for (let member of data.members) {
			let memberRoles: UserRoles = {
				admin: false,
				member: false,
				taskMaster: false,
				owner: false
			};

				for (let r of member.roles) {
					switch (r.role.name) {
						case Roles.Admin:
							memberRoles.admin = true;
							break;
						case Roles.Member:
							memberRoles.member = true;
							break;
						case Roles.TaskMaster:
							memberRoles.taskMaster = true;
							break;
						case Roles.Owner:
							memberRoles.owner = true;
							break;
						default:
							break;
					}
				}

			member.roles = memberRoles;
		}

		const userJson = await fetch(`${API_URL}/currentUser`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});

		const user = await userJson.json();

		for (let i = 0; i < data.columns; i++) {
			data.columns[i] = data.columns[i].cards?.sort((cardA: any, cardB: any) => {
				const dateA = new Date(cardA.creationDate).getTime();
				const dateB = new Date(cardB.creationDate).getTime();
				return dateA - dateB;
			});
		}

		return { project: data, user: user };
	}

	throw redirect(308, '/login');
}

