import { useEffect, useState, useCallback } from "react";
import { getProducts, deleteProduct } from "../../api";
import { AddProductForm } from "../form";
import { useTranslation } from "react-i18next";
import "./index.scss";

const ProductList = (props: any) => {
  const [idShowModal, setIsShowModal] = useState(false);
  const closeModal = useCallback(() => {
    setIsShowModal(false);
    window.location.reload();
  }, []);

  const { t } = useTranslation();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const products = await getProducts();
      setProducts(products.products);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Не вдалося отримати продукти. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <AddProductForm showModal={idShowModal} closeModal={closeModal} />
      <div className="list list-group">
        <div className="add-button-container">
          <button
            onClick={() => setIsShowModal(true)}
            className="btn btn-success btn-sm"
          >
            Add
          </button>
        </div>
        <div className="list-group-item list-group-item-action list-my">
          <div>{t("date")}</div>
          <div>{t("title")}</div>
          <div>{t("type")}</div>
          <div>{t("specification")}</div>
          <div>{t("guarantie_start")}</div>
          <div>{t("guarantie_end")}</div>
          <div>{t("serial")}</div>
          <div>{t("specifitation")}</div>
          <div></div>
        </div>
        {products &&
          products.map((product) => {
            return (
              <div className="list-group-item list-group-item-action list-my">
                <div>{product.date}</div>
                <div>{product.title}</div>
                <div>{product.type}</div>
                <div>{product.specification}</div>
                <div>{product.guarantee.start}</div>
                <div>{product.guarantee.end}</div>
                <div>{product.serialNumber}</div>
                <div>{product.specification}</div>

                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={async () => {
                    await deleteProduct(product._id);
                    window.location.reload();
                  }}
                >
                  Видалити
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default ProductList;
