import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    sessionID: String,
    cart: Object
  },
  {
    versionKey: false // You should be aware of the outcome after set to false
  }
);
export const Sessions = mongoose.model("Sessions", schema, "sessions");
