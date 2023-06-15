import { MongoClient, MongoClientOptions } from 'mongodb'

let cachedClient: MongoClient

export async function connectToDatabase(): Promise<MongoClient> {
  if (cachedClient) {
    return cachedClient
  }

  const options: MongoClientOptions = {}

  const client = new MongoClient(process.env.MONGODB_URI!, options)
  await client.connect()
  cachedClient = client
  return client
}
