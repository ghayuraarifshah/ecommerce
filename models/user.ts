import { model, Schema } from "mongoose";
import mongoose from "mongoose";
const userSchema = new Schema({
  name: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  billingAddress: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zipCode: Number,
  },
  shippingAdress: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zipCode: Number,
  },
  favorites: { type: [mongoose.Schema.Types.ObjectId], ref: "item" },
  orders: { type: [mongoose.Schema.Types.ObjectId], ref: "order" },
});

const userModel = mongoose.models.user || model("user", userSchema);

export default userModel;
