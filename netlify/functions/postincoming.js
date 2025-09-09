import mongoose from "mongoose";
import { Incoming } from "../models/index.js";
import dotenv from "dotenv";
dotenv.config();

const connectToDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("Error: MONGODB_URI not found!");
  }

  if (mongoose.connections[0].readyState) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI);
};

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed. Use POST." }),
    };
  }

  try {
    await connectToDatabase();
    const { name, isItNew, date } = JSON.parse(event.body);

    const newIncoming = new Incoming({
      name,
      isItNew,
      date,
    });

    await newIncoming.save();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Incoming added successfully",
        incoming: newIncoming,
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || "Failed to add incoming",
      }),
    };
  }
};
