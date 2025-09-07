import React, { useState } from "react";
import { addProduct } from "../../app";

interface AddProductFormProps {
  showModal: boolean;
  closeModal: () => void;
}

export const AddProductForm = (props: AddProductFormProps) => {
  const [productData, setProductData] = useState({
    id: Date.now(),
    serialNumber: "",
    isItNew: "",
    photo: "",
    title: "",
    type: "",
    specification: "",
    guarantee: {
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
    price: [
      { value: "", symbol: "USD", isDefault: 1 },
      { value: "", symbol: "UAH", isDefault: 0 },
    ],
    order: 1,
    date: new Date().toISOString(),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addProduct(productData);
      props.closeModal();
    } catch (err) {
      setError("Помилка при додаванні продукту");
      console.error("Error:", err);
    }
    props.closeModal();
    setLoading(false);
  };

  return (
    <dialog open={props.showModal}>
      <h1>Додати продукт</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Serial Number:</label>
          <input
            type="number"
            name="serialNumber"
            value={productData.serialNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Is it New:</label>
          <input
            type="number"
            name="isItNew"
            value={productData.isItNew}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Photo:</label>
          <input
            type="text"
            name="photo"
            value={productData.photo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={productData.type}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Specification:</label>
          <input
            type="text"
            name="specification"
            value={productData.specification}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Guarantee Start Date:</label>
          <input
            type="date"
            name="guaranteeStart"
            value={productData.guarantee.start}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Guarantee End Date:</label>
          <input
            type="date"
            name="guaranteeEnd"
            value={productData.guarantee.end}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price (USD):</label>
          <input
            type="number"
            name="price[0].value"
            value={productData.price[0].value}
            onChange={(e) => {
              const newPrice = [...productData.price];
              setProductData({ ...productData, price: newPrice });
            }}
          />
        </div>
        <div>
          <label>Order:</label>
          <input
            type="number"
            name="order"
            value={productData.order}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Додається..." : "Додати продукт"}
        </button>
        <button
          type="submit"
          disabled={loading}
          onClick={() => props.closeModal()}
        >
          {"Close"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </dialog>
  );
};
