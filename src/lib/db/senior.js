import mongoose from "mongoose";
const schema = mongoose.Schema;

const seniorSchema = new schema({
  std_id: Number,
  std_name: String,
  pokemon_id: Number,
  pokemon_name: String,
  wanted: Boolean,
  has_junior: Number,
  junior_found: Number,
  is_show_face: Boolean,
});

const seniorModel = mongoose.model("senior", seniorSchema);
export default seniorModel;
