// import mongoose from "mongoose";
// import User from "@/models/User";

// const connectMongo = async () => {
//   if (!process.env.MONGODB_URI) {
//     throw new Error(
//       "Add the MONGODB_URI environment variable inside .env.local to use mongoose"
//     );
//   }
//   return mongoose
//     .connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .catch((e) => console.error("Mongoose Client Error: " + e.message));
// };

// export default connectMongo;

// libs/mongoose.js (Recommended Structure)
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage. In production, each serverless function instance
 * will handle its own connection state.
 */
let cachedConnection = global.mongoose;

if (!cachedConnection) {
  cachedConnection = global.mongoose = { conn: null, promise: null };
}

async function connectMongo() {
  // If we have a cached connection, return it
  if (cachedConnection.conn) {
    // console.log('Using cached mongoose connection'); // Optional log
    return cachedConnection.conn;
  }

  // If no connection promise exists yet, create one
  if (!cachedConnection.promise) {
    const opts = {
      bufferCommands: false, // Recommended option
      // useNewUrlParser and useUnifiedTopology are deprecated and default to true/true respectively in Mongoose 6+
    };

    console.log('Creating new mongoose connection...');
    cachedConnection.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('Mongoose connection successful.');
        return mongooseInstance;
      })
      .catch(err => {
          console.error("Mongoose connection error:", err);
          cachedConnection.promise = null; // Important: Allow retry on next call if connection failed
          throw err; // Re-throw error after logging
      });
  }

  // Await the promise to ensure the connection is established
  try {
    cachedConnection.conn = await cachedConnection.promise;
  } catch (e) {
    cachedConnection.promise = null; // Reset promise if await fails
    throw e; // Re-throw error
  }

  return cachedConnection.conn;
}

export default connectMongo;