import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const schema = new mongoose.Schema({
  name: "string",
  description: "string",
  image: "string"
});
schema.plugin(mongoosePaginate);

export const Product = mongoose.model("Product", schema, "product");
