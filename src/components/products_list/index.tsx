import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../app";
import { AddProductForm } from "../form";

const ProductList = (props: any) => {
  const [products, setProducts] = useState<any[]>([]);
  // const [products, setProducts] = useState<any[]>([]);
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
    <div>
      <AddProductForm
        showModal={props.showModal}
        closeModal={props.closeModal}
      />
      <h1>Список продуктів</h1>
      {loading && <p>Завантаження...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {products && products.length === 0 && !loading && (
        <p>Немає доступних продуктів.</p>
      )}
      <ul>
        {products &&
          products.map((product) => (
            <li key={product.id}>
              <h3>{product.title}</h3>
              <p>{product.type}</p>
              <p>{product.specification}</p>
              <p>
                Ціна:
                {product.price && product.price.length > 0 ? (
                  product.price.map((priceItem: any, index: number) => (
                    <span key={index}>
                      {priceItem.value} {priceItem.symbol}
                      {index < product.price.length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  <span>Ціна не вказана</span>
                )}
              </p>
              <button
                onClick={async () => {
                  await deleteProduct(product._id);
                  window.location.reload();
                }}
              >
                Видалити {product._id}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductList;
