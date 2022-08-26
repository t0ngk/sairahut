import juniorModel from '$lib/db/junior';
import pokedexModel from '$lib/db/pokedex';
import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ params, request, locals }){
  let {pokemon_id} = await request.json();
  let { id } = params;
  const pokemon = await pokedexModel.findOne({pokemon_id: pokemon_id});
  if (!pokemon) {
    throw error(404, "Pokemon not found");
  }
  const isAlredyUse = await juniorModel.findOne({pokemon_id});
  if (isAlredyUse) {
    throw error(400, "Pokemon already use");
  }
  const junior = await juniorModel.findOneAndUpdate({ std_id: id }, {pokemon_id: pokemon_id, pokemon_name: pokemon.pokemon_name}, { new: true });
  if (!junior) {
    throw error(404, "Not Found");
  }
  return new Response(JSON.stringify(junior));
}
