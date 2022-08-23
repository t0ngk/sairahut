import pokedexModel from "$lib/db/pokedex";
import { error } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params ,request, locals }) {
  const { id } = params;
  const pokemon = await pokedexModel.findOne({ pokemon_id: id });
  if (!pokemon) {
    throw error(404, "Not Found");
  }
  return new Response(JSON.stringify(pokemon));
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function PATCH({ params, request, locals }) {
  const { id } = params;
  const req = await request.json();
  const pokemon = await pokedexModel.findOneAndUpdate({ pokemon_id: id }, req, { new: true });
  if (!pokemon) {
    throw error(404, "Not Found");
  }
  return new Response(JSON.stringify(pokemon));
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function DELETE({ params, locals }) {
  const { id } = params;
  const pokemon = await pokedexModel.findOneAndDelete({ pokemon_id: id });
  if (!pokemon) {
    throw error(404, "Not Found");
  }
  return new Response(JSON.stringify(pokemon));
}



