import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import Product from "../models/index.js";

const connectToDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI не задано! Перевірте ваш .env файл.");
  }

  if (mongoose.connections[0].readyState) {
    return;
  }

  console.log("Підключення до MongoDB...");
  await mongoose.connect(process.env.MONGODB_URI);
};

export const handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed. Use GET." }),
    };
  }

  try {
    await connectToDatabase();

    const products = await Product.find();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Products fetched successfully",
        products: products,
      }),
    };
  } catch (error) {
    console.error("Помилка під час читання продуктів:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || "Failed to fetch products",
      }),
    };
  }
};
