import mongoose from "mongoose";
import { Incoming } from "../models/index.js";
import dotenv from "dotenv";
dotenv.config();

const connectToDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("Error MONGODB_URI!");
  }

  if (mongoose.connections[0].readyState) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI);
};

export const handler = async () => {
  try {
    await connectToDatabase();

    const incomings = await Incoming.find();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Incomings fetched successfully",
        incomings: incomings,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || "Failed to fetch incomings",
      }),
    };
  }
};
