import seniorModel from "$lib/db/senior";
import Jwt from 'jsonwebtoken'
import { error } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').RequestHandler} */

export async function POST({ request, locals }) {
  const { std_id, std_name, pokemon_id, pokemon_name } = await request.json();
  if (!std_id || !std_name) {
    throw error(400, "Missing Parameters");
  }

  const newSenior = new seniorModel({
    std_id,
    std_name,
    pokemon_id : pokemon_id || null,
    pokemon_name : pokemon_name || null,
  });

  return new Response(JSON.stringify(await newSenior.save()));
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ request, locals }) {
  let token = request.headers.get('authorization');
	if (!token || token == null) {
		throw error(400, 'Unauthorized');
	}
	token = token.split(' ')[1];
	const { user } = Jwt.decode(token, 'sairahut_super_secret');
	if (String(user.std_id).startsWith('65')) {
    throw error(400, 'Missing Permission');
  }

  return new Response(JSON.stringify(await seniorModel.find()));
}
