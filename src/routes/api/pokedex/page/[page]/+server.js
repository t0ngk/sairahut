import pokedexModel from '$lib/db/pokedex';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params, request, locals }) {
	const { page } = params;
	const allpokemon = await pokedexModel.find();
  const pokemon = allpokemon.slice((page - 1) * 10, page * 10);
	return new Response(JSON.stringify(pokemon));
}
