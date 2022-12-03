import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import userModel from "../../models/user";
import user from "../../interface/user";
import secret from "../../secret";
import type error from "../../interface/error";
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
      const user = await userModel.findById(userId);
      if (!user || !user.favorites || !user.save)
        throw new Error("Something went wrong");
      if (user.favorites.find((el: string) => el == itemId)) {
        user.favorites = user.favorites.filter((el: string) => el != itemId);
      } else {
        user?.favorites?.push(itemId);
      }
      await user.save();
      res.send(user);
    } catch (e) {
      res.status(500).send({ message: "something went wrong" });
    }
  }
}
