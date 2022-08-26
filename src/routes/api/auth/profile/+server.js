import seniorModel from '$lib/db/senior';
import juniorModel from '$lib/db/junior';

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
	let payload = null
	if (user.std_id.startsWith('64')) {
		payload = await seniorModel.findOne({ std_id: user.std_id }, {_id: 0, __v: 0});
	} else {
		payload = await juniorModel.findOne({ std_id: user.std_id }, {_id: 0, __v: 0});
	};
	return new Response(JSON.stringify({ user:payload }));
}
