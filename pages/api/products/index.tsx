import nc from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/Product";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

export default handler;
