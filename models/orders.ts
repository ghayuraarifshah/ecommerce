import { model, Schema } from "mongoose";
import mongoose from "mongoose";
import itemModel from "./items";
const orderSchema = new Schema({
  items: { type: [mongoose.Schema.Types.ObjectId] },
  total: Number,
  quantity: Number,
});

const orderModel = mongoose.models.order || model("order", orderSchema);

export default orderModel;
