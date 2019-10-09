import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
    zIndex: 1,
    position: "fixed",
    left: "50%",
    top: "50%",
  },
}));

export default function Spinner() {
  const classes = useStyles();

  return (
    <div>
      <CircularProgress className={classes.progress} color='secondary' />
    </div>
  );
}
