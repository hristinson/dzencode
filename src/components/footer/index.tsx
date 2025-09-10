import styles from "./index.module.scss";
import useText from "../../lib/useText";
import packageInfo from "../../../package.json";

const Footer = () => {
  const { t } = useText();

  return (
    <footer className={styles.footer}>
      <p>
        {t("footer_text")} {packageInfo.version}
      </p>
    </footer>
  );
};

export default Footer;
