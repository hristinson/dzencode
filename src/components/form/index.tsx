import React, { useState } from "react";
import { addProduct } from "../../api";
import { newProduct } from "../../models";
import useText from "../../lib/useText";
import "./index.scss";

interface AddProductFormProps {
  showModal: boolean;
  closeModal: () => void;
}

export const AddProductForm = (props: AddProductFormProps) => {
  const { t } = useText();
  const [productData, setProductData] = useState<newProduct>({
    serialNumber: "",
    isItNew: "",
    photo: "test.jpg",
    title: "",
    type: "",
    specification: "",
    guarantee: {
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
    price: [
      { value: 0, symbol: "USD", isDefault: 1 },
      { value: 0, symbol: "UAH", isDefault: 0 },
    ],
    date: new Date().toISOString(),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "guaranteeStart":
        setProductData({
          ...productData,
          guarantee: {
            ...productData.guarantee,
            start: value,
          },
        });
        break;
      case "guaranteeEnd":
        setProductData({
          ...productData,
          guarantee: {
            ...productData.guarantee,
            end: value,
          },
        });
        break;
      case "price_value_usd":
        setProductData({
          ...productData,
          price: [
            { value: parseInt(value), symbol: "USD", isDefault: 1 },
            { value: 0, symbol: "UAH", isDefault: 0 },
          ],
        });
        break;
      default:
        setProductData({
          ...productData,
          [name]: value,
        });
        break;
    }
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
    <div>
      {props.showModal && <div className="modal-backdrop fade show"></div>}
      <dialog open={props.showModal} className="dialog">
        <p className="dialog-header">{t("please_input_data")}</p>
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="container">
            <div>
              <div className="form-group">
                <label>Serial Number:</label>
                <input
                  className="form-control"
                  type="text"
                  name="serialNumber"
                  value={productData.serialNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Is it New:</label>
                <input
                  className="form-control"
                  type="text"
                  name="isItNew"
                  value={productData.isItNew}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Title:</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  value={productData.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Type:</label>
                <input
                  className="form-control"
                  type="text"
                  name="type"
                  value={productData.type}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div>
                <label>Specification:</label>
                <input
                  className="form-control"
                  type="text"
                  name="specification"
                  value={productData.specification}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Guarantee Start Date:</label>
                <input
                  className="form-control"
                  type="date"
                  name="guaranteeStart"
                  value={productData.guarantee.start}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Guarantee End Date:</label>
                <input
                  className="form-control"
                  type="date"
                  name="guaranteeEnd"
                  value={productData.guarantee.end}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Price (USD):</label>
                <input
                  className="form-control"
                  type="number"
                  name="price_value_usd"
                  value={productData.price[0].value}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-success btn-sm my-btn"
          >
            {loading ? t("adding") : t("add_new_product")}
          </button>
          <button
            className="btn btn-secondary btn-sm"
            type="submit"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              props.closeModal();
            }}
          >
            {"Close"}
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </dialog>
    </div>
  );
};
