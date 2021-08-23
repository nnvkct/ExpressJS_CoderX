import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: "string",
  phoneNumber: "string",
  email: "string",
  password: "string"
});
export const User = mongoose.model("User", schema, "users");
