import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../../api";
import { AddProductForm, DeleteProductForm } from "../form";
import useText from "../../lib/useText";
import Loader from "../loader";
import "./index.scss";

const ProductList = () => {
  const [idShowModal, setIsShowModal] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [deletedProductId, setDeletedProductId] = useState("");
  const closeModal = useCallback(() => {
    setIsShowModal(false);
    window.location.reload();
  }, []);

  const { t } = useText();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const products = await getProducts();
      setProducts(products.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {loading && <Loader />}
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
              <th>{t("is_new_product")}</th>
              <th></th>
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
                    {!!product.isItNew ? (
                      <span className="text-success">&#10003;</span>
                    ) : (
                      <span className="text-danger">&#10007;</span>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn  btn-light btn-sm"
                      onClick={() => {
                        setDeletedProductId(product._id);
                        setIsShowDelete(true);
                      }}
                    >
                      <span className="text-danger">&#10007;</span>
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
