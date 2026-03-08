import mongoose from "mongoose";

let MONGODB_URI = process.env.MONGODB_URL;

if (!MONGODB_URI) {
    console.log("Database is not connnected!")
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    }
}

const connectDB = async () => {
    try {
        if (cached.conn) return cached.conn;

        if (!cached.promise) {
            cached.promise = mongoose.connect(MONGODB_URI, {
                dbName: "Book-Manager",
                bufferCommands: false,
            });
            cached.conn = await cached.promise;
            return cached.conn;
        }


    } catch (error) {
        cached.promise = null;
        console.log("Database is not connnected!", error.message);

    }
}

export default connectDB;