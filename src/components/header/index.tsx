import useText from "../../lib/useText";
import { CurrentDateTime } from "../widgets";
import Logo from "../images";
import styles from "./index.module.scss";

const Header = () => {
  const { t } = useText();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Logo />
      </div>
      <div className={styles.center}>{t("inventory")}</div>
      <div className={styles.right}>{CurrentDateTime()}</div>
    </header>
  );
};

export default Header;
