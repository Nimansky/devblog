import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const run = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error('MONGO_URI is not defined');
    }
    await connect(mongoUri);
    console.log('Connected to MongoDB');
};

export { run };