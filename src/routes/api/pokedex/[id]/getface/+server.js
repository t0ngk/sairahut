import { error } from '@sveltejs/kit';
import seniorModel from '$lib/db/senior';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params ,request, locals }) {
  const { id } = params;
  const senior = await seniorModel.findOne({ pokemon_id: id });
  if (!senior) {
    throw error(404, "Not Found");
  }
  if (!senior.is_show_face) {
    return new Response("Not Now");
  }
  return new Response(JSON.stringify({std_id: senior.std_id, std_name: senior.std_name}));
}
