import { Link } from "react-router-dom";
import styles from "./index.module.scss";

const Sidebar = () => {
  const handleClickproducts = () => {
    window.location.href = "/products";
  };

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/incoming">Incoming</Link>
        </li>
        <li>
          <Link to="/products" onClick={handleClickproducts}>
            Products
          </Link>
        </li>
        <li>
          <Link to="/contacts">Contacts</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
