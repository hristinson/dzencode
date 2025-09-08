import mongoose from "mongoose";
import Product from "../models/index.js";
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

export const handler = async (event, context) => {
  if (event.httpMethod !== "DELETE") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed. Use DELETE." }),
    };
  }

  try {
    await connectToDatabase();
    const { _id } = JSON.parse(event.body);

    if (!_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing product ID" }),
      };
    }
    const deletedProduct = await Product.findByIdAndDelete(_id);
    if (!deletedProduct) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Product not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Product deleted successfully",
        product: deletedProduct,
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || "Failed to process request",
      }),
    };
  }
};
