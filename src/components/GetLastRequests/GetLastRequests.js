import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HistoryIcon from "@material-ui/icons/History";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
}));

export default function GetLastRequests(props) {
  const classes = useStyles();
  console.log("getLastRequest");
  return (
    <List
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          Last Search Requests
        </ListSubheader>
      }
      className={classes.root}
    >
      {props.list.map(item => (
        <a href={`/?q=${item.value}`} key={item._id} className={classes.link}>
          <ListItem button key={item._id}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary={item.value} />
          </ListItem>
        </a>
      ))}
    </List>
  );
}
