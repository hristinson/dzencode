import "./index.scss";
import { useTranslation } from "react-i18next";
import packageInfo from "../../../package.json";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <p>{t("footer_text")}</p>
      <p>{packageInfo.version}</p>
    </footer>
  );
};

export default Footer;
