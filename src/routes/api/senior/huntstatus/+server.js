import seniorModel from "$lib/db/senior";
import Jwt from 'jsonwebtoken'
import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */

export async function GET({ params, request, locals }) {

    let id = null;
    let name = null;

    try {
        let token = request.headers.get("authorization").split(" ")[1];
        const { user: { std_id, std_name } } = Jwt.decode(token)
        id = std_id;
        name = std_name;

        if (String(std_id).slice(0, 2) != 64) {
            throw new Error('Unauthorized');
        }

    } catch (err) {
        // ถ้าเกิดถอดไม่ได้ หรือ ไม่มี permission
        throw error(400, err.message)
    }

    const seniorData = await seniorModel.find({}, "std_name wanted is_show_face pokemon_id pokemon_name").lean();

    return new Response(JSON.stringify({ seniorData}));
}
