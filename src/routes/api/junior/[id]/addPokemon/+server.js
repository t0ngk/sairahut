import juniorModel from '$lib/db/junior';
import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ params, request, locals }){
  let {pokemon_id} = await request.json();
  let { id } = params;
  const junior = await juniorModel.findOneAndUpdate({ std_id: id }, {pokemon_id: pokemon_id}, { new: true });
  if (!junior) {
    throw error(404, "Not Found");
  }
  return new Response(JSON.stringify(junior));
}
