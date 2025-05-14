import { MongoClient } from "mongodb";

let client;
let clientPromise;

if (!process.env.MONGO_URI) {
  throw new Error("Please add your MongoDB URI to the .env file");
}

const uri = process.env.MONGO_URI;
const options = {};

if (process.env.NODE_ENV === "development") {
  // En mode développement, utilisez un client MongoDB global pour éviter de créer plusieurs connexions.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En mode production, il est préférable de ne pas utiliser de variable globale.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

async function getDatabase() {
  const client = await clientPromise;
  return client.db();
}

export async function getCollection(collectionName) {
  const db = await getDatabase();
  return db.collection(collectionName);
}

export default getDatabase;
