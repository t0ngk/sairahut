/** @type {import('@sveltejs/kit').RequestHandler} */
import { error } from '@sveltejs/kit';
import Jwt from 'jsonwebtoken';
export async function GET({ request, locals }) {
	let token = request.headers.get('authorization');
	if (!token || token == null) {
		throw error(400, 'Unauthorized');
	}
	token = token.split(' ')[1];
	const { user } = Jwt.decode(token, 'sairahut_super_secret');
	return new Response(JSON.stringify({ user }));
}
