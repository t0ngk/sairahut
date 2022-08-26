import juniorModel from '$lib/db/junior';
import pokedexModel from '$lib/db/pokedex';
import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ params, request, locals }){
  let {pokemon_id} = await request.json();
  let { id } = params;
  let token = request.headers.get('authorization');
	if (!token || token == null) {
		throw error(400, 'Unauthorized');
	}
	token = token.split(' ')[1];
	const { user } = Jwt.decode(token, 'sairahut_super_secret');
	if (user.std_id.startsWith('65')) {
    throw error(400, 'Missing Permission');
  }
  const pokemon = await pokedexModel.findOne({pokemon_id: pokemon_id});
  if (!pokemon) {
    throw error(404, "Pokemon not found");
  }
  const junior = await juniorModel.findOneAndUpdate({ std_id: id }, {pokemon_id: pokemon_id, pokemon_name: pokemon.pokemon_name}, { new: true });
  if (!junior) {
    throw error(404, "Not Found");
  }
  return new Response(JSON.stringify(junior));
}
