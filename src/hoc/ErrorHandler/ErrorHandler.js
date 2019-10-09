import React from "react";
import classes from "./ErrorHandler.module.css";
export default function ErrorHandler(props) {
  return (
    <div id={classes.snackbar} className={classes.show}>
      {props.error}
    </div>
  );
}
