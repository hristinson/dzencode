import { useState } from "react";
import translations from "../locales/translation.json";

const useText = () => {
  const [texts] = useState(translations as Record<string, any>);
  const t = (key: string): string => {
    return texts[key] || key;
  };

  return { t };
};

export default useText;
