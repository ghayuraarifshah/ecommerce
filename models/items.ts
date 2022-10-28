import { model, Schema } from "mongoose";
import mongoose from "mongoose";
const itemSchema = new Schema({
  image: String,
  title: String,
  price: Number,
  views: Number,
  category: String,
  rating: Number,
  description: String,
});

const itemModel = mongoose.models.item || model("item", itemSchema);

export default itemModel;
