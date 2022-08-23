import seniorModel from "$lib/db/senior";
import { error } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params ,request, locals }) {
  const { id } = params;
  const senior = await seniorModel.findOne({ std_id: id });
  if (!senior) {
    throw error(404, "Not Found");
  }
  return new Response(JSON.stringify(senior));
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function PATCH({ params, request, locals }) {
  const { id } = params;
  const req = await request.json();
  const senior = await seniorModel.findOneAndUpdate({ std_id: id }, req, { new: true });
  if (!senior) {
    throw error(404, "Not Found");
  }
  return new Response(JSON.stringify(senior));
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function DELETE({ params, locals }) {
  const { id } = params;
  const senior = await seniorModel.findOneAndDelete({ std_id: id });
  if (!senior) {
    throw error(404, "Not Found");
  }
  return new Response(JSON.stringify(senior));
}
