import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URL;
    
    if (!MONGO_URI) {
      throw new Error("MongoDB connection string is not defined in environment variables.");
    }

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB;
