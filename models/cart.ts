import { model, Schema } from "mongoose";
import mongoose from "mongoose";
import itemModel from "./items";
const cartSchema = new Schema({
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "item" },
      quantity: Number,
    },
  ],
  total: Number,
  quantity: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const cartModel = mongoose.models.cart || model("cart", cartSchema);

export default cartModel;
