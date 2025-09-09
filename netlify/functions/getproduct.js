import mongoose from "mongoose";
import { Product } from "../models/index.js";
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

export const handler = async (event) => {
  try {
    await connectToDatabase();

    const { id } = event.queryStringParameters || {};
    const product = await Product.find({ _id: id });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Product fetched successfully",
        product: product,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || "Failed to fetch product",
      }),
    };
  }
};
