import { model, Schema } from "mongoose";
import mongoose from "mongoose";
const offersSchema = new Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "item" },
  category: String,
  discount: Number,
});

const offersModel = mongoose.models.offers || model("offers", offersSchema);

export default offersModel;
