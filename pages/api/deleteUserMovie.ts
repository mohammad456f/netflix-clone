import type { NextApiHandler } from "next";
import { MongoClient, ObjectId } from "mongodb";

const handler: NextApiHandler = async (req, res) => {
  const { userId, movie } = req.body;
  const client = new MongoClient(process.env.DB_CONN_STRING as string);
  const collection = client.db().collection("users");
  const query = {
    _id: new ObjectId(userId),
  };
  const findUser = await collection.findOne(query);

  const updateMoviesId = findUser?.movies.filter(
    (element: any) => !(element === movie)
  );

  const updateUser = { ...findUser, moviesId: updateMoviesId };

  await collection.updateOne(query, {
    $set: updateUser,
  });

  res.status(200).json({ message: "successful" });
};

export default handler;