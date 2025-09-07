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

// Модель для роботи з колекцією 'products'
const Product = mongoose.model("Product", productSchema, "products");

export const handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed. Use GET." }),
    };
  }

  try {
    // Чекаємо на підключення до БД
    await connectToDatabase();

    // Читаємо всі продукти з бази даних
    const products = await Product.find();

    // Повертаємо список продуктів
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

// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// const connectToDatabase = async () => {
//   while (!process.env.MONGODB_URI) {
//     console.log("MONGODB_URI не доступна. Чекаємо...");
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Чекаємо 1 секунду
//   }

//   // Якщо MONGODB_URI вже є, підключаємось до MongoDB
//   if (mongoose.connections[0].readyState) {
//     return;
//   }

//   console.log("Підключення до MongoDB...");
//   await mongoose.connect(process.env.MONGODB_URI);
// };

// // Створення схеми для продукту
// const productSchema = new mongoose.Schema({
//   id: Number,
//   serialNumber: Number,
//   isNew: Number,
//   photo: String,
//   title: String,
//   type: String,
//   specification: String,
//   guarantee: {
//     start: Date,
//     end: Date,
//   },
//   price: [
//     {
//       value: Number,
//       symbol: String,
//       isDefault: Number,
//     },
//   ],
//   order: Number,
//   date: Date,
// });

// const Product = mongoose.model("Product", productSchema);

// export const handler = async (event, context) => {
//   // Якщо запит не GET — повертаємо 405 (метод не дозволений)
//   if (event.httpMethod !== "GET") {
//     return {
//       statusCode: 405,
//       body: JSON.stringify({ error: "Method Not Allowed. Use GET." }),
//     };
//   }

//   try {
//     // Чекаємо на підключення до БД
//     await connectToDatabase();

//     // Отримуємо всі продукти з бази даних
//     const products = await Product.find();

//     // Перевірка чи є продукти в базі
//     if (!products || products.length === 0) {
//       return {
//         statusCode: 404,
//         body: JSON.stringify({ error: "No products found." }),
//       };
//     }

//     // Повертаємо знайдені продукти
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ products }),
//     };
//   } catch (error) {
//     console.error("Помилка під час отримання продуктів:", error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: "Failed to fetch products" }),
//     };
//   }
// };
