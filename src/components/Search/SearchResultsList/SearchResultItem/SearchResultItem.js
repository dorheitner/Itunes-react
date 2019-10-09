import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    justifyContent: "flex-start",
    width: "80%",
    textDecoration: "none",
    margin: "0 auto",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
  content: {
    justifyContent: "flex-start",
  },

  cover: {
    width: 100,
    height: 100,
    margin: 10,
  },
  madia: {
    alignContent: "center",
    display: "flex",
    margin: 10,
    flexFlow: "column wrap",
  },
  actions: {
    display: "flex",
  },
}));

export default function MediaControlCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component='h5' variant='h5'>
            {props.song.trackName}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {props.song.artistName}
          </Typography>
          <Typography variant='subtitle2' gutterBottom>
            {props.song.collectionCensoredName}
          </Typography>
          <Typography variant='caption' display='block' gutterBottom>
            {props.song.primaryGenreName}
          </Typography>
          <Typography variant='caption' display='block' gutterBottom>
            {props.song.releaseDate.substring(0, 4)}, {props.song.country}
          </Typography>
        </CardContent>
      </div>
      <div className={classes.madia}>
        <CardMedia
          className={classes.cover}
          image={props.song.artworkUrl100}
          title={props.song.trackName}
        />
      </div>
    </Card>
  );
}
