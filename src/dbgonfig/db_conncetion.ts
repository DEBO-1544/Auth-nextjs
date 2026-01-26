import mongoose from "mongoose";

// We create a cache to store the connection state
let isConnected = false; 

const connectToDB = async () => {
    mongoose.set('strictQuery', true); // Recommended for Mongoose 6/7/8

    if (isConnected) {
        console.log("=> Using existing database connection");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URL!);

        // Check the state: 1 means connected
        isConnected = db.connections[0].readyState === 1;
        
        console.log("=> MongoDB connected successfully");
    } catch (error) {
        console.error("=> MongoDB connection error:", error);
        // Important: In a route handler, don't use process.exit(1)
        // because it will kill the whole dev server. Just throw the error.
        throw new Error("Failed to connect to MongoDB");
    }
}

export default connectToDB;