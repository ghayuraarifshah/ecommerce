import { model, Schema } from "mongoose";
import mongoose from "mongoose";
import itemModel from "./items";
const orderSchema = new Schema({
  orderedBy: { type: [mongoose.Schema.Types.ObjectId], ref: "user" },
  items: { type: [mongoose.Schema.Types.ObjectId], ref: "item" },
  total: Number,
  quantity: Number,
  orderedOn: { type: Date, default: Date.now() },
});

const orderModel = mongoose.models.order || model("order", orderSchema);

export default orderModel;
