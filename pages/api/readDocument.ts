import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

const handler: NextApiHandler = async (req, res) => {
  const { email, password } = req.body;
  const client = new MongoClient(process.env.DB_CONN_STRING as string);
  const collection = client.db().collection("users");
  const user = await collection.findOne({ email, password });

  res.status(200).json({ user: user });
};

export default handler;
