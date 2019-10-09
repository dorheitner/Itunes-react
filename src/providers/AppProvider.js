import React from "react";

import AppContext from "../contexts/AppContext";
import ErrorHandler from "../hoc/ErrorHandler/ErrorHandler";

export default function AppProvider(props) {
  return (
    <>
      <AppContext.Provider value={props.error}>
        {props.isError ? <ErrorHandler error={props.error} /> : null}
        {props.children}
      </AppContext.Provider>
    </>
  );
}
