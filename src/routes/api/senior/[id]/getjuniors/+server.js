import juniorModel from '$lib/db/junior';
import seniorModel from '$lib/db/senior';
import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params, request, locals }) {
  const {id} = params;
  const senior = await seniorModel.findOne({ std_id: id });
  if (!senior) {
    throw error(404, "Not Found");
  }
  return new Response(JSON.stringify(await juniorModel.find({ pokemon_id: senior.pokemon_id })));
}
