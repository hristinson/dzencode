import logo from "./logo.svg";
import "./App.css";
import { addProduct } from "./app";
import ProductList from "./components/products_list";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Frontend </p>
        <ProductList />
        <button onClick={() => addProduct()}>Add</button>
      </header>
    </div>
  );
};

export default App;
