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

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params, locals }) {
  const junior = await juniorModel.find({} , { _id: 0, __v: 0 });
  if (!junior) {
    throw error(404, "Not Found");
  }
  return new Response(JSON.stringify(junior));
}
