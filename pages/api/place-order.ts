import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import orderModel from "../../models/orders";
import order from "../../interface/offers";
import userModel from "../../models/user";
import user from "../../interface/user";
import secret from "../../secret";
interface Body {
  userId: string;
  order: order;
}
type error = { error: string };
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<user | error>
) {
  const conn = await mongoose.connect(secret.monogo);
  if (req.method === "POST") {
    try {
      const body: Body = JSON.parse(req.body);
      const newOrder = new orderModel({ ...body.order });
      await newOrder.save();
      const user = await userModel.findOne({ _id: body.userId });
      user.orders.push(newOrder._id);
      await user.save();
      res.status(200).send(user);
    } catch (e) {
      console.log(e);
      res.status(404).send({ error: "failed to fetch data" });
    }
  }
}
