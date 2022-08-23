import mongoose from "mongoose";
const schema = mongoose.Schema;

const pokedexSchema = new schema({
  pokemon_id: Number,
  pokemon_name: String,
  pokemon_url: String,
  hint: Array,
});

const pokedexModel = mongoose.model("pokemon", pokedexSchema);
export default pokedexModel;
