import { Db, MongoClient } from "mongodb";

const dbName = process.env.MONGODB_DB_NAME || "dev-tools";

declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined;
  var __mongoIndexesReady: boolean | undefined;
}

let clientPromise: Promise<MongoClient> | undefined;

function getMongoClientPromise() {
  if (clientPromise) {
    return clientPromise;
  }

  if (global.__mongoClientPromise) {
    clientPromise = global.__mongoClientPromise;
    return clientPromise;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  const client = new MongoClient(uri);
  clientPromise = client.connect();

  if (process.env.NODE_ENV !== "production") {
    global.__mongoClientPromise = clientPromise;
  }

  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const connectedClient = await getMongoClientPromise();
  const db = connectedClient.db(dbName);

  if (!global.__mongoIndexesReady) {
    await Promise.all([
      db.collection("users").createIndex({ username: 1 }, { unique: true }),
      db.collection("history").createIndex({ user_id: 1, created_at: -1 }),
    ]);
    global.__mongoIndexesReady = true;
  }

  return db;
}
