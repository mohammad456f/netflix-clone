import type { NextApiHandler } from "next";
import { MongoClient, ObjectId } from "mongodb";
import { Movie } from "../../typings";

const handler: NextApiHandler = async (req, res) => {
  const { userId, movie } = req.body;
  const client = new MongoClient(process.env.DB_CONN_STRING as string);
  const collection = client.db().collection("users");
  const query = {
    _id: new ObjectId(userId),
  };
  const findUser = await collection.findOne(query);

  if (findUser?.movies === undefined) {
    await collection.updateOne(query, {
      $set: { ...findUser, movies: [movie] },
    });
  } else if (
    findUser?.movies.map((movie: Movie) => movie.id).includes(movie.id)
  ) {
    res.status(200).json({ message: "This movie already exists on your list" });
  } else {
    await collection.updateOne(query, {
      $set: { ...findUser, movies: [...findUser.movies, movie] },
    });
  }
  res.status(200).json({ message: "successful" });
};

export default handler;
