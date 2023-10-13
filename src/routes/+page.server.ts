import { API_URL } from '$env/static/private';

export async function load({ cookies }: any) {
	const jwt = cookies.get('jwt');

	if (jwt) {
		const response = await fetch(`${API_URL}/Account/currentUser`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});

		const data = await response.json();

		return { user: data };
	} else {
		return { user: null };
	}
}
