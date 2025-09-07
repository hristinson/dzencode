import { useTranslation } from "react-i18next";
import "./index.scss";

const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="header">
      <h1>{t("welcome_message")}</h1>
      <div>
        <button onClick={() => changeLanguage("en")}>
          {t("english_button")}
        </button>
        <button onClick={() => changeLanguage("ua")}>
          {t("ukrainian_button")}
        </button>
      </div>
    </header>
  );
};

export default Header;
