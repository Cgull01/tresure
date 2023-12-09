import { API_URL } from '$env/static/private';

export async function load({ cookies }: any) {
	const jwt = cookies.get('jwt');

	if (jwt) {
		const response = await fetch(`${API_URL}/api/currentUser`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});

		if (response.ok) {
			const data = await response.json();
			return { user: data };
		} else {
			return { user: null };
		}
	} else {
		return { user: null };
	}
}
