import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../../api";
import { AddProductForm, DeleteProductForm } from "../form";
import useText from "../../lib/useText";
import "./index.scss";

const ProductList = (props: any) => {
  const [idShowModal, setIsShowModal] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [deletedProductId, setDeletedProductId] = useState("");
  const closeModal = useCallback(() => {
    setIsShowModal(false);
    window.location.reload();
  }, []);

  const { t } = useText();
  const [products, setProducts] = useState<any[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string>("");

  const fetchProducts = async () => {
    try {
      // setLoading(true);
      // setError("");

      const products = await getProducts();
      setProducts(products.products);
    } catch (err) {
      console.error("Error fetching products:", err);
      // setError("Не вдалося отримати продукти. Спробуйте ще раз.");
    } finally {
      // setLoading(false);
    }
  };

  // const deleteProdutc = useCallback((product) => {
  //   async () => {
  //     await deleteProduct(product._id);
  //     window.location.reload();
  //   };
  // }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <AddProductForm showModal={idShowModal} closeModal={closeModal} />
      <DeleteProductForm
        showModal={isShowDelete}
        closeModal={closeModal}
        id={deletedProductId}
      />
      <div className="add-button-container">
        <button
          onClick={() => setIsShowModal(true)}
          className="btn btn-success btn-sm"
        >
          Add
        </button>
      </div>

      <div className="table-responsive list">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>{t("title")}</th>
              <th>{t("type")}</th>
              <th>{t("specification")}</th>
              <th>{t("guarantie_start")}</th>
              <th>{t("guarantie_end")}</th>
              <th>{t("serial")}</th>
              <th>{t("specifitation")}</th>
              <th>{t("price_usd")}</th>
              <th></th> {/* Для кнопки "Видалити" */}
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product.title}</td>
                  <td>{product.type}</td>
                  <td>{product.specification}</td>
                  <td>{product.guarantee.start}</td>
                  <td>{product.guarantee.end}</td>
                  <td>{product.serialNumber}</td>
                  <td>{product.specification}</td>
                  <td>{product.price[0].value}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        setDeletedProductId(product._id);
                        setIsShowDelete(true);
                      }}
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ProductList;
