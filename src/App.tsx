import ProductList from "./components/products_list";
import packageInfo from "../package.json";
import { useCallback, useState } from "react";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = useCallback(() => {
    setShowModal(false);
    window.location.reload();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Frontend {packageInfo.version}</p>
        <ProductList showModal={showModal} closeModal={closeModal} />
        <button onClick={() => setShowModal(true)}>Add</button>
      </header>
    </div>
  );
};

export default App;
