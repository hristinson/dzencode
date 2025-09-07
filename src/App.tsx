import { addProduct } from "./app";
import ProductList from "./components/products_list";
import packageInfo from "../package.json";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Frontend {packageInfo.version}</p>
        <ProductList />
        <button onClick={() => addProduct()}>Add</button>
      </header>
    </div>
  );
};

export default App;
