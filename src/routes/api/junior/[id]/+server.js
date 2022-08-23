import juniorModel from '$lib/db/junior';
import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params, locals }) {
  const { id } = params;
  const junior = await juniorModel.findOne({ std_id: id });
  if (!junior) {
    throw error(404, "Not Found");
  }
  return new Response(JSON.stringify(junior));
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function PATCH({ params, request, locals }) {
  const { id } = params;
  const req = await request.json();
  const junior = await juniorModel.findOneAndUpdate({ std_id: id }, req, { new: true });
  if (!junior) {
    throw error(404, "Not Found");
  }
  return new Response(JSON.stringify(junior));
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function DELETE({ params, locals }) {
  const { id } = params;
  const junior = await juniorModel.findOneAndDelete({ std_id: id });
  if (!junior) {
    throw error(404, "Not Found");
  }
  return new Response(JSON.stringify(junior));
}
