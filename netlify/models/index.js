import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  serialNumber: String,
  isItNew: String,
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

const Product = mongoose.model("Product", productSchema, "products");

export default Product;
