import juniorModel from '$lib/db/junior';
import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request, locals }) {
  const { std_id, std_name, pokemon_id } = await request.json();
  if (!std_id || !std_name) {
    throw error(400, "Missing Parameters");
  }

  const newJunior = new juniorModel({
    std_id,
    std_name,
    pokemon_id : pokemon_id || null,
  });

  return new Response(JSON.stringify(await newJunior.save()));
};
