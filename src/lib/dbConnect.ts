import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGOOSE_URI!;

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default dbConnect;
