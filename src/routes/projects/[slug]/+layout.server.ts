import { API_URL } from '$env/static/private';
import { formatData } from '$lib/functions';
import type { IProject, UserRoles, IMember, IUser } from '$lib/types';
import { error, redirect } from '@sveltejs/kit';

export const ssr = false;

export async function load({ params, fetch, cookies }: any) {
	const res = await fetch(`/api?project=${params.slug}`, {
		method: 'GET'
	});

	const data:{project: IProject, user: IUser} = await res.json();

	for(let col of data.project.columns)
	{
		if(col.cards)
		for(let c of col.cards)
		{
			// console.warn(c);
		}
	}

	data.project = formatData(data.project);

	return data;
}
// export async function load({ params, fetch, cookies }: any) {
// 	const res = await fetch(`/api?project=${params.slug}`, {
// 		method: 'GET'
// 	});

// 	const data = await res.json();

// 	console.warn(data);
// 	const jwt = cookies.get('jwt');

// 	if (jwt) {
// 		const response = await fetch(`${API_URL}/Project/${params.slug}`, {
// 			headers: {
// 				Authorization: `Bearer ${jwt}`
// 			}
// 		});

// 		if (!response.ok) throw error(404, 'Error loading project data');

// 		let data: IProject = await response.json();
// 		// console.warn(data);

// 		if (!data) return error(422, 'Failed to Process project data');

// 		data = formatData(data);

// 		const userJson = await fetch(`${API_URL}/currentUser`, {
// 			headers: {
// 				Authorization: `Bearer ${jwt}`
// 			}
// 		});

// 		const user = await userJson.json();

// 		const user_member = data.members.find((m: IMember) => m.user.username === user.username);
// 		const user_memberId = user_member?.id;

// 		console.log({ project: data, user: { ...user, member_id: user_memberId } })
// 		return { project: data, user: { ...user, member_id: user_memberId } };
// 	}

// 	throw redirect(308, '/login');
// }

// const res = await fetch(`api?project=${params.slug}`, {
// 		method: 'GET',

// 	});

// const data = await res.json();

// return({...data});
