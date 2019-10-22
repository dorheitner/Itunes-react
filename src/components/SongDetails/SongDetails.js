import React, { useEffect, useState, useContext } from "react";

import axios from "../../axios-itunes";
import _ from "lodash";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Media from "./Media/Media";
import useReactRouter from "use-react-router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { Spinner } from "../UI/Spinner";
import AppContext from "../../contexts/AppContext";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    width: "80%",
    margin: "2% auto",
    height: "70vh",
    padding: 20,
  },
  contentArea: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cover: {
    width: 100,
    height: 100,
    margin: 10,
  },
  header: {
    display: "flex",
    width: "100%",
    height: 120,
  },
  title: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: 10,
    textAlign: "start",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
    alignItems: "flex-start",
    width: "60%",
  },
  button: {
    margin: "1rem 0",
  },
  link: {
    textDecoration: "none",
  },
  video: {
    width: "90%",
    margin: "0 auto",
  },
  videoTitle: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "2% auto 2%",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  goBack: {
    cursor: "pointer",
    display: "flex",
    margin: "10px 0",
  },
  goBackWrapper: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  sppiner: {
    display: "flex",
    alignItems: "center",
    color: "pink",
  },
  cardMediaContainer: {
    width: "100%",
  },
  "@media only screen and (max-width: 1200px)": {
    card: {
      flexDirection: "column",
    },
    content: {
      width: "100%",
      alignItems: "center",
    },
    header: {
      justifyContent: "center",
    },
  },
}));

export default function SongDetails(props) {
  const setErorr = useContext(AppContext).setErrorProp;

  console.log("songDetails");
  const songId = props.match.params.songid;
  const [songData, setSongData] = useState();
  const [musicVideo, setMusicVideo] = useState(false);
  const [media, setMedia] = useState("");

  const { history } = useReactRouter();

  const classes = useStyles();

  useEffect(() => {
    console.log("useEffect1");
    const errorsCatcher = message => {
      setErorr(true, message);
      setTimeout(function() {
        setErorr(false, null);
      }, 3000);
    };
    // Get Track Details By Track Id From The Server
    axios
      .post("/itunes/trackId", { trackId: songId })
      .then(response => {
        if (!_.isEmpty(response.data.results)) {
          setSongData(response.data.results[0]);

          // Get Track Details With Music Video
          axios
            .post("/itunes/video", {
              artistName: response.data.results[0].artistName,
              trackName: response.data.results[0].trackName,
            })
            .then(response => {
              if (response.data.results.url) {
                setMedia(response.data.results.url);
                setMusicVideo(true);
              } else {
                setMedia("audio");
              }
            })
            .catch(error => {
              errorsCatcher("Somthing went worg, please try again");
            });
        } else {
          errorsCatcher(
            "ON! We didn't found this song, Please try another one"
          );
        }
      })
      .catch(error => {
        errorsCatcher("Somthing went worg, please try again");
      });
  }, [songId, setErorr]);

  return (
    <>
      {!songData ? (
        <Spinner />
      ) : (
        <Card className={classes.card}>
          <div className={classes.content}>
            <header className={classes.header}>
              <div>
                <CardMedia
                  className={classes.cover}
                  image={songData.artworkUrl100}
                  title={songData.trackName}
                />
              </div>
              <div className={classes.title}>
                <Typography component='h5' variant='h5'>
                  {songData.trackName}
                </Typography>
                <Typography variant='subtitle1' color='textSecondary'>
                  {songData.artistName}
                </Typography>
              </div>
            </header>
            <div className={classes.content}>
              <Typography variant='subtitle2' gutterBottom>
                {songData.collectionCensoredName}
              </Typography>
              <Typography variant='caption' display='block' gutterBottom>
                {songData.primaryGenreName}
              </Typography>
              <Typography variant='caption' display='block' gutterBottom>
                {songData.releaseDate.substring(0, 4)}, {songData.country}
              </Typography>
              <a
                rel='noopener noreferrer'
                href={songData.trackViewUrl}
                target='_blank'
                className={classes.link}
              >
                <Button
                  variant='contained'
                  color='secondary'
                  className={classes.button}
                >
                  BUY THIS TRACK FOR {songData.collectionPrice}{" "}
                  {songData.currency}
                </Button>
              </a>
              <div className={classes.goBackWrapper} onClick={history.goBack}>
                <ArrowBackIosIcon className={classes.goBack} />
                <Typography variant='caption' display='block' gutterBottom>
                  GO BACK{" "}
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.cardMediaContainer}>
            {media && (
              <Media
                media={media}
                musicVideo={musicVideo}
                audioSource={songData.previewUrl}
              />
            )}

            <div className={classes.videoTitle}>
              <Typography component='h5' variant='h5'>
                {songData.trackName}
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                {songData.artistName}
              </Typography>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
