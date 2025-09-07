import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import Product from "../models/index.js";

const connectToDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("Error: MONGODB_URI не задано!");
  }

  if (mongoose.connections[0].readyState) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI);
};

export const handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed. Use POST." }),
    };
  }

  try {
    await connectToDatabase();
    const {
      serialNumber,
      isItNew,
      photo,
      title,
      type,
      specification,
      guarantee,
      price,
      order,
      date,
    } = JSON.parse(event.body);

    // if (!id || !serialNumber || !title || !price) {
    //   return {
    //     statusCode: 400,
    //     body: JSON.stringify({ error: "Missing required fields" }),
    //   };
    // }

    const newProduct = new Product({
      serialNumber,
      isItNew,
      photo,
      title,
      type,
      specification,
      guarantee,
      price,
      order,
      date,
    });

    await newProduct.save();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Product added successfully",
        product: newProduct,
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Failed to add product" }),
    };
  }
};
