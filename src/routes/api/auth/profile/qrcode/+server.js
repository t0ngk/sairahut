import seniorModel from '$lib/db/senior';
import { error } from '@sveltejs/kit';
import Jwt from 'jsonwebtoken';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ request, locals }) {
	let token = request.headers.get('authorization');
	if (!token || token == null) {
		throw error(400, 'Unauthorized');
	}
	token = token.split(' ')[1]; // ดึงค่าหลัง Bearer
	const { user } = Jwt.decode(token, 'sairahut_super_secret');
	if (String(user.std_id).startsWith('64') || String(user.std_id).startsWith('63')) {
    const senior = await seniorModel.findOne({ std_id: user.std_id }, { _id: 0, __v: 0 });
    return new Response(Jwt.sign({senior_id: senior.std_id}, 'sairahut_super_secret'));
  }
  throw error(400, 'Unauthorized');
}
