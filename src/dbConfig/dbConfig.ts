import mongoose from 'mongoose';

let isConnectedBefore = false;

export async function connect() {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!isConnectedBefore) {
        try {
            await mongoose.connect(process.env.MONGODB_Signin_URI!);
            isConnectedBefore = true;
            console.log('MongoDB connected successfully');
        } catch (error) {
            if (error instanceof Error) {
                console.error('Failed to connect to MongoDB:', error.message);
            } else {
                console.error('Failed to connect to MongoDB due to an unexpected error');
            }
            process.exit(1);
        }
    }
}
