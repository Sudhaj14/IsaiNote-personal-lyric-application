import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI environment variable')

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// Extend the NodeJS global type to include our cache
declare global {
  // Allow reuse of this variable in development (Hot Reloading)
  var mongooseCache: MongooseCache | undefined
}

const globalWithMongoose = global as typeof globalThis & {
  mongooseCache: MongooseCache
}

const cached = globalWithMongoose.mongooseCache || {
  conn: null,
  promise: null,
}

globalWithMongoose.mongooseCache = cached

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: 'lyrics-manager',
        bufferCommands: false,
      })
      .then((mongoose) => mongoose)
  }

  cached.conn = await cached.promise
  return cached.conn
}
