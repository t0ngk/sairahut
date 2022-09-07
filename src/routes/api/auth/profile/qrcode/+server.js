import seniorModel from '$lib/db/senior';

/** @type {import('@sveltejs/kit').RequestHandler} */
import { error } from '@sveltejs/kit';
import Jwt from 'jsonwebtoken';
export async function GET({ request, locals }) {
	let token = request.headers.get('authorization');
	if (!token || token == null) {
		throw error(400, 'Unauthorized');
	}
	token = token.split(' ')[1]; // ดึงค่าหลัง Bearer
	try{ 
		const { user } = Jwt.decode(token, 'sairahut_super_secret');
		if (String(user.std_id).startsWith('64') || String(user.std_id).startsWith('63')) { // พี่
      const senior = await seniorModel.findOne({ std_id: user.std_id }, {_id: 0, __v: 0});
			return new Response(Jwt.sign({senior_id: senior.std_id}, 'sairahut_super_secret'));
		} else {
			return error(400, 'Missing Permission');
		};
	}catch(err){
		// ชิบหายละ แม่งไม่มี token หรือไรสักอย่าง
		console.log(err)
		throw error(400, 'Unauthorized or something went wrong!');
	}
}
