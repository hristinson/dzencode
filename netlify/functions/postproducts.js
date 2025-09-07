import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Підключення до бази даних
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

// Схема продукту
const productSchema = new mongoose.Schema({
  id: Number,
  serialNumber: Number,
  isItNew: Number,
  photo: String,
  title: String,
  type: String,
  specification: String,
  guarantee: {
    start: Date,
    end: Date,
  },
  price: [
    {
      value: Number,
      symbol: String,
      isDefault: Number,
    },
  ],
  order: Number,
  date: Date,
});

// Перевірка чи модель вже існує
const Product =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema, "products");

export const handler = async (event, context) => {
  //   if (event.httpMethod !== "POST") {
  //     return {
  //       statusCode: 405,
  //       body: JSON.stringify({ error: "Method Not Allowed. Use POST." }),
  //     };
  //   }

  try {
    // Чекаємо на підключення до БД
    await connectToDatabase();

    // Створення фейкових статичних даних
    const fakeProductData = {
      id: 999, // Наприклад, фейковий ID
      serialNumber: 5678,
      isItNew: 1,
      photo: "fakePathToFile.jpg",
      title: "Fake Product",
      type: "Monitors",
      specification: "Fake Specification",
      guarantee: {
        start: "2022-01-01T12:00:00Z", // Статичні дати
        end: "2023-01-01T12:00:00Z",
      },
      price: [
        { value: 150, symbol: "USD", isDefault: 1 },
        { value: 4000, symbol: "UAH", isDefault: 0 },
      ],
      order: 1,
      date: "2022-01-01T12:00:00Z", // Статична дата
    };

    // Створюємо новий продукт із фейковими даними
    const newProduct = new Product(fakeProductData);

    // Зберігаємо новий продукт в базі даних
    await newProduct.save();

    // Повертаємо успішний результат
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
