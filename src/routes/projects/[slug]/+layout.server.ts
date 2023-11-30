import { API_URL } from '$env/static/private';
import { formatData } from '$lib/functions';
import type { IProject, UserRoles, IMember, IUser } from '$lib/types';
import { error, redirect } from '@sveltejs/kit';

export const ssr = false;

export async function load({ params, fetch }: any) {
	const res = await fetch(`/api?project=${params.slug}`, {
		method: 'GET'
	});

	const data:{project: IProject, user: IUser, user_roles: any} = await res.json();

	data.project = formatData(data.project);
	data.user_roles = data.project.members.find((member) => member.user.email === data.user.email)?.roles;

	return data;
}
