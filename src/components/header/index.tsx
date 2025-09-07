import { useTranslation } from "react-i18next";
import { CurrentDateTime } from "../widgets";
import "./index.scss";
import Logo from "../images";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="left">
        <Logo />
      </div>
      <div className="center">{t("inventory")}</div>
      <div className="right">{CurrentDateTime()}</div>
    </header>
  );
};

export default Header;
