import seniorModel from "$lib/db/senior";
import Jwt from 'jsonwebtoken'
import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */

export async function PUT({ request, locals }) {
  const { wanted } = await request.json();
  let token = request.headers.get('authorization');
	if (!token || token == null) {
		throw error(400, 'Unauthorized');
	}
	token = token.split(' ')[1];
	const { user } = Jwt.decode(token, 'sairahut_super_secret');
	if (String(user.std_id).startsWith('65')) {
    throw error(400, 'Missing Permission');
  }
  const senior = await seniorModel.findOneAndUpdate({ std_id: user.std_id }, { wanted: wanted });
  if (!senior) {
    throw error(404, "Not Found");
  }

  return new Response("success");
}
