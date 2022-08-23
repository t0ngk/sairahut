import pokedexModel from '$lib/db/pokedex';
import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ request, locals }) {
  return new Response(JSON.stringify(await pokedexModel.find()));
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request, locals }) {
  const { pokemon_id, pokemon_name, pokemon_url, hint } = await request.json();
  if (!pokemon_id || !pokemon_name || !pokemon_url) {
    throw error(400, "Missing Parameters");
  }

  const newPokemon = new pokedexModel({
    pokemon_id,
    pokemon_name,
    pokemon_url : pokemon_url,
    hint: hint || [],
  });

  return new Response(JSON.stringify(await newPokemon.save()));
}
