import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const addProduct = async (productData: Record<string, any>) => {
  type newProduct = {
    id: any;
    serialNumber: string;
    isItNew: 1;
    photo: string;
    title: string;
    type: string;
    specification: string;
    guarantee: {
      start: any;
      end: any;
    };
    price: [
      { value: number; symbol: "USD"; isDefault: 1 },
      { value: number; symbol: "UAH"; isDefault: 0 }
    ];
    order: 1;
    date: any;
  };
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
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        _id: productId, // Надсилаємо ID продукту для видалення
      },
    });
    console.log("Product deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting product", error);
  }
};
