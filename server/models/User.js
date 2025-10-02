import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true }, 
  passwordHash: { type: String, required: true },      
  name: { type: String, required: true },
  surname: {type: String, required: true },                               
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);