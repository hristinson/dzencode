import { useEffect, useState, useCallback } from "react";
import { getProducts, getIncoming } from "../../../api";
import { AddProductForm, DeleteProductForm } from "../../form/product";
import useText from "../../../lib/useText";
import Loader from "../../loader";
import "./index.scss";
import { useLocation } from "react-router-dom";
import Product from "../../pages/product";

const ProductList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchByIncoming = queryParams.get("searchByIncoming");
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowProductModal, setisShowProductModal] = useState<
    string | boolean
  >(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [deletedProductId, setDeletedProductId] = useState("");
  const closeModal = useCallback(() => {
    setIsShowModal(false);
    window.location.reload();
  }, []);

  const { t } = useText();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [incomingName, setIncomingName] = useState<string>();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let products;
      let incoming;

      if (searchByIncoming) {
        products = await getProducts(searchByIncoming);
        incoming = await getIncoming(searchByIncoming);
        setIncomingName(incoming.incoming[0].name);
      } else {
        products = await getProducts(null);
      }
      setProducts(products.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Product
        closeModal={() => setisShowProductModal(false)}
        showModal={!!isShowProductModal}
        id={isShowProductModal}
      />
      <AddProductForm showModal={isShowModal} closeModal={closeModal} />
      <DeleteProductForm
        showModal={isShowDelete}
        closeModal={closeModal}
        id={deletedProductId}
      />
      <div className="add-product-button-container">
        {searchByIncoming && incomingName ? (
          <p className="info">View only products by {incomingName}</p>
        ) : (
          <p className="info">View only All products</p>
        )}
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
                <tr
                  key={product._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setisShowProductModal(product._id);
                  }}
                >
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
                      <></>
                    )}
                  </td>
                  <td
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
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
