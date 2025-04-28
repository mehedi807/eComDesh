import mongoose from "mongoose";

export const connectDB = async () => {
    const URI = process.env.MONGODB_URI;
    try {
        const conn = await mongoose.connect(URI);
        console.log('MongoDB Connected Succesfully');
    } catch (error) {
        console.log('Failed to connect MongoDB');
    }
};