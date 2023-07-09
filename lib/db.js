import { MongoClient, ServerApiVersion } from 'mongodb';

export async function connectToDatabase() {
  const client = MongoClient.connect(
    process.env.MONGODB_URI,
    {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    }
  );
  return client;
}
