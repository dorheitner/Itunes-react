import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { SerachResultItem } from "./SearchResultItem";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 600,
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: theme.palette.background.paper,
    flexDirection: "column",
    margin: "2% auto",
  },
  inline: {
    display: "inline",
  },
  links: {
    textDecoration: "none",
    width: "100%",
    margin: "2px auto",
    display: "flex",
    flexDirection: "column",
  },
}));

export default React.memo(function SearchResultsList(props) {
  console.log("searchResultsList");
  const classes = useStyles();
  if (props.songsData) {
    return (
      <List className={classes.root}>
        {props.songsData &&
          props.songsData.map(song => (
            <Link
              className={classes.links}
              to={{ pathname: `/song/${song.trackId}` }}
              key={`${song.trackId}_Link`}
              songdetails={song}
            >
              <div key={`${song.trackId}_Avatar`}>
                <ListItem key={song.trackId} alignItems='flex-start'>
                  <SerachResultItem song={song} />
                </ListItem>
              </div>
            </Link>
          ))}
      </List>
    );
  }
});
