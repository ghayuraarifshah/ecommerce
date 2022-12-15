import mongoose from "mongoose";
import secret from "../../secret";
import type { NextApiRequest, NextApiResponse } from "next";
import type error from "../../interface/error";
import itemModel from "../../models/items";
import item from "../../interface/item";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | error>
) {
  try {
    const conn = await mongoose.connect(secret.monogo);
    const { str } = JSON.parse(req.body);
    const items = await itemModel.find<item>({ title: { $regex: str } });
    res.status(200).send({
      items,
    });
    conn.disconnect();
  } catch (error) {
    res.status(404).send({ message: "failed to fetch data" });
  }
}
