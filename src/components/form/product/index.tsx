import React, { useState, useEffect } from "react";
import { addProduct } from "../../../api";
import { newProduct, newIncoming } from "../../../models";
import useText from "../../../lib/useText";
import { deleteProduct } from "../../../api";
import { getIncomings } from "../../../api";

interface ProductFormProps {
  showModal: boolean;
  closeModal: () => void;
  id?: string;
}

export const AddProductForm = (props: ProductFormProps) => {
  const { t } = useText();
  const [incomings, setIncomings] = useState<newIncoming[]>([
    {
      name: "",
      isItNew: false,
      date: undefined,
    },
  ]);
  const [productData, setProductData] = useState<newProduct>({
    serialNumber: "",
    isItNew: false,
    photo: "test.jpg",
    title: "",
    type: "",
    specification: "",
    incoming: "",
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

  useEffect(() => {
    const inData = async () => await getIncomings();
    inData().then((incomings) => setIncomings(incomings.incomings));
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setError(null);
    const { name, value } = e.target;
    switch (name) {
      case "isItNew":
        setProductData({
          ...productData,
          isItNew: !productData.isItNew,
        });
        break;
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

    if (productData.title.trim() === "") {
      setLoading(false);
      setError("Please enter Title");
      return;
    }

    if (productData.incoming.trim() === "") {
      setLoading(false);
      setError("Please select Incoming Manager");
      return;
    }

    try {
      await addProduct(productData);
      props.closeModal();
    } catch (err) {
      setError("Error adding produtc");
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
              <div className="form-group pt-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isItNew"
                    checked={productData.isItNew}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Is it New?</label>
                </div>
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
              <select
                className="form-control"
                name="incoming"
                value={productData.incoming}
                onChange={handleChange}
              >
                <option value="">Select Incoming</option>
                {incomings &&
                  incomings.map((incoming) => (
                    <option key={incoming && incoming._id} value={incoming._id}>
                      {incoming.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
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
      </dialog>
    </div>
  );
};

export const DeleteProductForm = (props: ProductFormProps) => {
  const { t } = useText();
  return (
    <div>
      {props.showModal && <div className="modal-backdrop fade show"></div>}
      <dialog open={props.showModal} className="dialog">
        <h4 className="modal-title text-center mb-4">{t("are_you_sure")}</h4>
        <button
          type="submit"
          className="btn btn-danger btn-sm my-btn me-2"
          onClick={(e) => {
            props.id && deleteProduct(props.id);
            e.preventDefault();
            props.closeModal();
          }}
        >
          <i className="bi bi-trash"></i> Delete
        </button>

        <button
          className="btn btn-secondary btn-sm my-btn"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            props.closeModal();
          }}
        >
          <i className="bi bi-x-circle"></i> Close
        </button>
      </dialog>
    </div>
  );
};
