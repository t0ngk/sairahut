import mongoose from "mongoose";
const schema = mongoose.Schema;

const juniorSchema = new schema({
  std_id: String,
  std_name: String,
  pokemon_id: Number,
  pokemon_name: String
});

const juniorModel = mongoose.model("junior", juniorSchema);
export default juniorModel;
