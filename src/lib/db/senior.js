import mongoose from "mongoose";
const schema = mongoose.Schema;

const seniorSchema = new schema({
  std_id: String,
  std_name: String,
  pokemon_id: Number,
  pokemon_name: String,
});

const seniorModel = mongoose.model("senior", seniorSchema);
export default seniorModel;
