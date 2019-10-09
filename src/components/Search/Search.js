import React, { useState, useEffect } from "react";

import axios from "../../axios-itunes";
import _ from "lodash";
import useReactRouter from "use-react-router";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import { SearchResultsList } from "./SearchResultsList";
import { Spinner } from "../UI/Spinner";

// Last Requests Component
import { GetLastRequests } from "../GetLastRequests";
import AppProvider from "../../providers/AppProvider";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    alignItems: "center",
    width: "22rem",
    margin: "2% auto",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  form: {
    display: "flex",
  },
  searchButton: {
    justifyContent: "flex-end",
    padding: 10,
  },
  "@media only screen and (max-width: 800px)": {
    root: {
      margin: "2rem auto",
    },
  },
}));

export default function Search(props) {
  const classes = useStyles();

  const { location } = useReactRouter();
  const [searchValue, setSearachValue] = useState("");
  const [songsData, setSongsData] = useState();
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [showlastRequest, setShowLastRequest] = useState(false);
  const [requestList, setRequestList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(false);

  const { history } = useReactRouter();

  // (1) Check If Where Is a quey Params.
  // (2) Save query params as a search value (searchValue state)
  useEffect(() => {
    let query;
    if (location.search) {
      query = location.search.split("=");
      setSearachValue(query[1]);
      submitSearch();
    }
  }, [searchValue]);

  // Get The Last 10 Search Requests From The Server
  useEffect(() => {
    axios
      .get("/requests")
      .then(res => {
        if (!_.isEmpty(res.data.data.results)) {
          setRequestList(res.data.data.results);
        }
      })
      .catch(error => {
        errorsCatcher("Somthing went worg, please try again");
      });
  }, []);

  // Catch Error Message And Manage The Error States (isError, error)
  const errorsCatcher = message => {
    setError(message);
    setIsError(true);
    setTimeout(function() {
      setIsError(false);
    }, 3000);
  };

  // Submit The Search Request To The Server
  const submitSearch = event => {
    console.log(searchValue);
    if (!_.isEmpty(searchValue)) {
      console.log(searchValue);
      let parseSearchValue = searchValue.replace(/ /g, "+");
      if (!location.search) {
        event.preventDefault();
        axios.post(`/requests/save`, { value: parseSearchValue });
        setShowLastRequest(false);
      }

      // Define The Search Request as a URL Query Param
      history.push({
        pathname: "/",
        search: `?q=${searchValue}`,
      });
      setLoaderStatus(true);

      // Send Request To The Server
      axios
        .get(`/itunes?value=${parseSearchValue}`)
        .then(response => {
          setLoaderStatus(false);

          if (!_.isEmpty(response.data.results)) {
            setSongsData(response.data.results);
          } else {
            errorsCatcher(
              "ON! We didn't found this song, Please try another one"
            );
          }
        })
        .catch(error => {
          setLoaderStatus(false);
          errorsCatcher("Somthing went worg, please try again");
        });
    } else {
      if (!location.search) {
        event.preventDefault();
        errorsCatcher("OOPS, you forgot to type something!");
      }
    }
  };

  // Manage The Last Requests List (open and close)
  const lastRequestsClicked = props => {
    if (showlastRequest) {
      setShowLastRequest(false);
    } else {
      setShowLastRequest(true);
    }
  };

  return (
    <AppProvider error={error} isError={isError}>
      <Paper className={classes.root}>
        <form className={classes.form} noValidate autoComplete='off'>
          <IconButton
            className={classes.iconButton}
            aria-label='menu'
            onClick={lastRequestsClicked}
          >
            <MenuIcon />
          </IconButton>
          <InputBase
            id='inputBase'
            onBlur={showlastRequest ? lastRequestsClicked : null}
            className={classes.input}
            placeholder='Find a song'
            inputProps={{ "aria-label": "find a song" }}
            onChange={event => {
              location.search = "";
              setSearachValue(event.target.value);
            }}
          />
          <Button
            onClick={submitSearch}
            size='small'
            type='submit'
            className={classes.searchButton}
          >
            <SearchIcon />
          </Button>
        </form>
        <div className='lastRequestsWrapper' onBlur={lastRequestsClicked}>
          {showlastRequest ? <GetLastRequests list={requestList} /> : null}
        </div>
      </Paper>

      {loaderStatus ? <Spinner /> : <SearchResultsList songsData={songsData} />}
    </AppProvider>
  );
}
