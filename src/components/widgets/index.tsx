import React, { useState, useEffect } from "react";

export const CurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  const getFormattedDateTime = () => {
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat("uk-UA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);

    const formattedTime = new Intl.DateTimeFormat("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);

    return `${formattedDate} ${formattedTime}`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(getFormattedDateTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <div>{currentDateTime}</div>;
};
