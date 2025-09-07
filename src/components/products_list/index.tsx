import { useEffect, useState } from "react";
import { getProducts } from "../../app"; // Імпортуємо вашу функцію для отримання продуктів

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]); // Стан для зберігання продуктів
  const [loading, setLoading] = useState<boolean>(true); // Стан для відображення індикатора завантаження
  const [error, setError] = useState<string>(""); // Стан для зберігання повідомлень про помилки

  // Функція для отримання продуктів
  const fetchProducts = async () => {
    try {
      setLoading(true); // Починаємо завантаження
      setError(""); // Очищаємо попередні помилки

      const products = await getProducts(); // Викликаємо локальну функцію getProducts
      setProducts(products.products); // Зберігаємо отримані продукти в стан
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Не вдалося отримати продукти. Спробуйте ще раз.");
    } finally {
      setLoading(false); // Завершуємо завантаження
    }
  };

  useEffect(() => {
    fetchProducts(); // Викликаємо функцію для отримання продуктів при завантаженні компонента
  }, []); // Порожній масив залежностей означає, що функція викликається тільки один раз при завантаженні компонента

  return (
    <div>
      <h1>Список продуктів</h1>
      {loading && <p>Завантаження...</p>} {/* Індикатор завантаження */}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Повідомлення про помилки */}
      {products && products.length === 0 && !loading && (
        <p>Немає доступних продуктів.</p>
      )}{" "}
      {/* Повідомлення, якщо немає продуктів */}
      <ul>
        {products &&
          products.map((product) => (
            <li key={product.id}>
              <h3>{product.title}</h3>
              <p>{product.type}</p>
              <p>{product.specification}</p>
              <p>
                Ціна:
                {product.price && product.price.length > 0 ? ( // Перевірка на undefined або порожній масив
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
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductList;
