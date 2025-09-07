import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

// Це наша основна функція для відправки запиту
export const addProduct = async () => {
  const newProduct = {
    id: Date.now(), // Генерація унікального id
    serialNumber: 1234,
    isItNew: 1,
    photo: "pathToFile.jpg",
    title: "Product 1",
    type: "Monitors",
    specification: "Specification",
    guarantee: {
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
    price: [
      { value: 100, symbol: "USD", isDefault: 1 },
      { value: 2500, symbol: "UAH", isDefault: 0 },
    ],
    order: 1,
    date: new Date().toISOString(),
  };

  try {
    const response = await axios.post(`${apiUrl}postproducts`, newProduct);
    console.log("Product added successfully:", response.data);
  } catch (error) {
    console.error("Error adding product", error);
  }
};

export const getProducts = async () => {
  console.log("Fetching products...");
  try {
    // Відправка GET запиту на сервер для отримання всіх продуктів
    const response = await axios.get(`${apiUrl}getproducts`);
    console.log("Fetched products:", response.data);
    return response.data; // Повертаємо отримані продукти
  } catch (error) {
    console.error("Error fetching products", error);
  }
};
