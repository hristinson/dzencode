import { useState, useEffect } from "react";
import "./index.scss";
import { getProduct } from "../../../api";
import { newProduct } from "../../../models";
import Loader from "../../loader";

interface ProductModalProps {
  showModal: boolean;
  closeModal: () => void;
  id: string | boolean;
}

const Product = (props: ProductModalProps) => {
  const [product, setProduct] = useState<newProduct>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const product = await getProduct(props.id as string);
      setProduct(product.product[0]);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.showModal]);

  return (
    <>
      {loading && <Loader />}
      {props.showModal && (
        <div className="modal-overlay" onClick={props.closeModal}>
          <div
            className="modal-product-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-button" onClick={props.closeModal}>
              X
            </button>
            <h2>Product Info</h2>
            <ul>
              <li>Title: {product && product.title}</li>
              <li>Type: {product && product.type}</li>
              <li>Specification: {product && product.specification}</li>
              <li>
                Guarantie (start date): {product && product.guarantee.start}
              </li>
              <li>Guarantie (end date): {product && product.guarantee.end}</li>
              <li>Serial: {product && product.serialNumber}</li>
              <li>Specifitation: {product && product.specification}</li>
              <li>Price (USD): {product && product.price[0].value}</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
