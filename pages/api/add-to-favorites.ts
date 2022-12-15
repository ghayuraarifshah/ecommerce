import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import userModel from "../../models/user";
import user from "../../interface/user";
import secret from "../../secret";
import type error from "../../interface/error";
import item from "../../interface/item";
import itemModel from "../../models/items";
interface Body {
  userId: string;
  itemId: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<user | error>
) {
  const conn = await mongoose.connect(secret.monogo);
  if (req.method === "POST") {
    try {
      const { userId, itemId }: Body = JSON.parse(req.body);
      const item = await itemModel.findById<item>(itemId);
      const user = await userModel.findById<user>(userId).populate("favorites");
      if (!user || !user.favorites || !user.save || !item)
        throw new Error("Something went wrong");
      if (user.favorites.find((el: item) => el._id == itemId)) {
        user.favorites = user.favorites.filter((el: item) => el._id != itemId);
      } else {
        user.favorites.push(item);
      }
      await user.save();
      res.send(user);
    } catch (e) {
      res.status(500).send({ message: "something went wrong" });
    }
  }
}
