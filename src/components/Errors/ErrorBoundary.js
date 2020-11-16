import React from "react";
import ErrorHandler from "./ErrorHandler/ErrorHandler";

export default function ErrorBoundary(props) {
  // const [isError, setIsError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(null);

  // const setErrorProp = (error, message) => {
  //   console.log(error, message);
  //   if (error) {
  //     setIsError(true);
  //     setErrorMessage(message);
  //   } else {
  //     setIsError(false);
  //     setErrorMessage(null);
  //   }
  // };

  console.log(props);

  return (
    <div value={{ error: props.errors }}>
      {<ErrorHandler error={props.errors.message} />}
      {props.children}
    </div>
  );
}
