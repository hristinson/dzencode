import mongoose from "mongoose";
// Shema for Products category
const productSchema = new mongoose.Schema({
  serialNumber: String,
  isItNew: Boolean,
  photo: String,
  title: String,
  type: String,
  specification: String,
  incoming: String,
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

const Product = mongoose.model("Product", productSchema, "products");

// Shema for Incoming category
const incomingSchema = new mongoose.Schema({
  name: String,
  isItNew: Boolean,
  date: Date,
});

const Incoming = mongoose.model("Incoming", incomingSchema, "incoming");

export { Product, Incoming };
