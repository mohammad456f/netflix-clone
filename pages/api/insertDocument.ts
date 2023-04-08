import type { NextApiHandler } from "next";
import { MongoClient } from "mongodb";

const handler: NextApiHandler = async (req, res) => {
  const { email, password } = req.body;
  const client = new MongoClient(process.env.DB_CONN_STRING as string);
  const collection = client.db().collection("users");
  const findUser = await collection.findOne({
    email: email,
  });
  if (findUser === null) {
    await collection.insertOne({
      email: email,
      password: password,
    });
    const user = await collection.findOne({ email: email, password: password });

    res.status(200).json({ user: user });
  } else {
    res.status(200).json({ user: null });
  }
};

export default handler;
