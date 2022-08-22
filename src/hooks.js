import dotenv from 'dotenv';
dotenv.config();
const mongoURL = process.env.MONGO_URL;
import mongoose from 'mongoose';

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
