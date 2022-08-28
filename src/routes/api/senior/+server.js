import seniorModel from "$lib/db/senior";
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

// Get all seniors profile
export const GET = async () => {
  const res = {
    message: "Hello from server!"
  }

  return new Response(JSON.stringify(res));
}