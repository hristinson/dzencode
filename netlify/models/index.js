// productModel.js
import mongoose from "mongoose";

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

const Product = mongoose.model("Product", productSchema, "products");

export default Product;

// import mongoose from "mongoose";

// export const productSchema = new mongoose.Schema({
//   id: Number,
//   serialNumber: Number,
//   isItNew: Number,
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
