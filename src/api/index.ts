import axios from "axios";
import { newProduct } from "../models";
const apiUrl = process.env.REACT_APP_API_URL;

export const addProduct = async (productData: Record<string, any>) => {
  try {
    const response = await axios.post(
      `${apiUrl}postproducts`,
      productData as newProduct
    );
    console.log("Product added successfully:", response.data);
  } catch (error) {
    console.error("Error adding product", error);
  }
};

export const getProducts = async () => {
  console.log("Fetching products...");
  try {
    const response = await axios.get(`${apiUrl}getproducts`);
    console.log("Fetched products:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await axios.delete(`${apiUrl}deleteproduct`, {
      headers: { "Content-Type": "application/json" },
      data: { _id: productId },
    });
    console.log("Product deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting product", error);
  }
};
