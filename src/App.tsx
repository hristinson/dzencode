import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/pages/products_list";
import IncomingList from "./components/pages/incoming_list";
import Header from "./components/header";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";
import Home from "./components/pages/home";
import Contacts from "./components/pages/contacts";

import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-content">
          <Sidebar />
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/incoming" element={<IncomingList />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
