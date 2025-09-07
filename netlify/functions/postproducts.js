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
  try {
    await connectToDatabase();

    const fakeProductData = {
      id: 999,
      serialNumber: 5678,
      isItNew: 1,
      photo: "fakePathToFile.jpg",
      title: "Fake Product",
      type: "Monitors",
      specification: "Fake Specification",
      guarantee: {
        start: "2022-01-01T12:00:00Z",
        end: "2023-01-01T12:00:00Z",
      },
      price: [
        { value: 150, symbol: "USD", isDefault: 1 },
        { value: 4000, symbol: "UAH", isDefault: 0 },
      ],
      order: 1,
      date: "2022-01-01T12:00:00Z",
    };

    const newProduct = new Product(fakeProductData);

    await newProduct.save();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Fake product added successfully",
        product: newProduct,
      }),
    };
  } catch (error) {
    console.error("Помилка під час додавання продукту:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Failed to add product" }),
    };
  }
};
