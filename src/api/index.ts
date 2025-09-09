import axios from "axios";
import { newProduct, newIncoming } from "../models";
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

export const addIncoming = async (incomingData: Record<string, any>) => {
  try {
    const response = await axios.post(
      `${apiUrl}postincoming`,
      incomingData as newIncoming
    );
    console.log("Product added successfully:", response.data);
  } catch (error) {
    console.error("Error adding product", error);
  }
};

export const getProducts = async (searchByIncoming: string | null) => {
  console.log("Fetching products...");
  try {
    if (searchByIncoming) {
      const response = await axios.get(
        `${apiUrl}getproducts?searchByIncoming=${searchByIncoming}`
      );
      console.log("Fetched products:", response.data);
      return response.data;
    } else {
      const response = await axios.get(`${apiUrl}getproducts`);
      console.log("Fetched products:", response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching products", error);
  }
};

export const getIncomings = async () => {
  console.log("Fetching incomings...");
  try {
    const response = await axios.get(`${apiUrl}getincomings`);
    console.log("Fetched incomings:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching incomings", error);
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

export const deleteIncoming = async (incomingId: string) => {
  try {
    const response = await axios.delete(`${apiUrl}deleteincoming`, {
      headers: { "Content-Type": "application/json" },
      data: { _id: incomingId },
    });
    console.log("Incoming deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting incoming", error);
  }
};

export const getIncoming = async (id: string) => {
  console.log("Fetching incoming...");
  try {
    const response = await axios.get(`${apiUrl}getincoming?id=${id}`);
    console.log("Fetched incomings:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching incomings", error);
  }
};
