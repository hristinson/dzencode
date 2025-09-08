import "./index.scss";
import useText from "../../lib/useText";
import packageInfo from "../../../package.json";

const Footer = () => {
  const { t } = useText();

  return (
    <footer className="footer">
      <p>{t("footer_text")}</p>
      <p>{packageInfo.version}</p>
    </footer>
  );
};

export default Footer;
