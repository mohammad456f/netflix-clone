import type { NextApiHandler } from "next";
import { MongoClient, ObjectId } from "mongodb";

const handler: NextApiHandler = async (req, res) => {
  const { userId } = req.body;
  const client = new MongoClient(process.env.DB_CONN_STRING as string);
  const collection = client.db().collection("users");
  const query = {
    _id: new ObjectId(userId),
  };
  const findUser = await collection.findOne(query);

  res.status(200).json({ movies: findUser?.movies });
};

export default handler;
