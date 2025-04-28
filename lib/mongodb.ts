// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || '';  // Store your MongoDB URI in .env

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable so the MongoClient is not constantly re-instantiated
  if ((global as any)._mongoClientPromise) {
    clientPromise = (global as any)._mongoClientPromise;
  } else {
    client = new MongoClient(MONGO_URI);
    (global as any)._mongoClientPromise = client.connect();
    clientPromise = (global as any)._mongoClientPromise;
  }
} else {
  // In production, it's safe to not use global variables
  client = new MongoClient(MONGO_URI);
  clientPromise = client.connect();
}

export default clientPromise;
