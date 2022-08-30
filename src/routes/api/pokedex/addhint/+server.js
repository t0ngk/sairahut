import pokedexModel from '$lib/db/pokedex';
import { error } from '@sveltejs/kit';
import seniorHint from "../../../../../static/senior-hint.json"
/** @type {import('@sveltejs/kit').RequestHandler} */

export const GET = async () => {

    const pokedex = await pokedexModel.find({}, "pokemon_id pokemon_name");

    const getEachPokeId = pokedex.map(pokemon => pokemon.pokemon_id); // Get every pokemons id in array form 👾

    const checker = seniorHint.map(person => { // ตรวจสอบว่าพี่ทุกคนมี pokemon ใน DB ของ schema pokedex จริงหรือไม่
        return getEachPokeId.includes(person.pokemon_id)
    }).every(v => v == true) // ผลลัพธ์ ต้อง true

    console.log("การตรวจสอบความถูกต้องของพี่ กับ โปเกม่อนของพี่ :", checker)

    if (checker) {
        return new Response(JSON.stringify(seniorHint));
    } else {
        throw new Error("ข้อมูลโปเกม่อนกับพี่ ไม่สอดคล้องอาจจะเป็นเพราะ พี่มี ID โปเกม่อนที่ไม่มีในฐานข้อมูล ทำให้ไม่สามารถเพิ่มคำใบ้ได้")
    }

}

export const PUT = async ({ request }) => {

    const { hintNumber } = await request.json()

    if (hintNumber == 0) {
        try {
            await pokedexModel.updateMany({}, { $set: { hints: [] } })
            return new Response(JSON.stringify({ status: "success" }))
        } catch (err) {
            throw new Error({ status: "error" })
        }
    } else {
        try {
            if(hintNumber > 6) throw new Error({status: "error"});
            seniorHint.forEach((senior, i) => {
                pokedexModel.updateOne({ pokemon_id: senior.pokemon_id }, { $push: { hints: senior[`hint_${hintNumber}`] } }).exec((err, data) => {
                    if (err) {
                        console.log("error on :", i, err)
                        throw new Error(err)
                    }
                })
            })
            return new Response(JSON.stringify({ status: "success" }))
        } catch (err) {
            return new Response(JSON.stringify({ status: "error" }))
        }
    }
}
