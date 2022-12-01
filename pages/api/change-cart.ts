import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import secret from "../../secret";
import cartModel from "../../models/cart";
import type cart from "../../interface/cart";
import type error from "../../interface/error";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<cart | error>
) {
  const conn = await mongoose.connect(secret.monogo);
  if (req.method === "POST") {
    try {
      const cart: cart = JSON.parse(req.body);
      await cartModel.findByIdAndUpdate<cart>(cart._id, cart, { new: true });
      res.status(200).send(cart);
    } catch (e) {
      res.status(404).send({ message: "failed to fetch data" });
    }
  }
}
