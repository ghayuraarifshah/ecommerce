import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import secret from "../../secret";
import userModel from "../../models/user";
import type user from "../../interface/user";
import type error from "../../interface/error";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<user | error>
) {
  const conn = await mongoose.connect(secret.monogo);
  if (req.method === "POST") {
    try {
      const user: user = JSON.parse(req.body);
      await userModel.findByIdAndUpdate<user>(user._id, user, { new: true });
      res.status(200).send(user);
    } catch (e) {
      res.status(404).send({ message: "failed to fetch data" });
    }
  }
}
