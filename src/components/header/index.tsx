import useText from "../../lib/useText";
import { CurrentDateTime } from "../widgets";
import "./index.scss";
import Logo from "../images";

const Header = () => {
  const { t } = useText();

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
