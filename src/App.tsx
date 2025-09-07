import "./i18n";
import ProductList from "./components/products_list";
import { useCallback, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import "./index.scss";

const App = () => {
  return (
    <div className="App">
      <Header />
      <ProductList />
      <Footer />
    </div>
  );
};

export default App;
