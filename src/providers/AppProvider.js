import React, { useState } from "react";

import AppContext from "../contexts/AppContext";
import ErrorHandler from "../hoc/ErrorHandler/ErrorHandler";

export default function AppProvider(props) {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const setErrorProp = (error, message) => {
    console.log(error, message);
    if (error) {
      setIsError(true);
      setErrorMessage(message);
    } else {
      setIsError(false);
      setErrorMessage(null);
    }
  };
  console.log("AppProvider");

  return (
    <>
      <AppContext.Provider value={{ error: props.error, setErrorProp }}>
        {isError && <ErrorHandler error={errorMessage && errorMessage} />}
        {props.children}
      </AppContext.Provider>
    </>
  );
}
