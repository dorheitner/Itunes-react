import React, { useState, useEffect, useContext, useCallback } from "react";

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
import AppContext from "../../contexts/AppContext";

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

export default React.memo(function Search(props) {
  const setErorr = useContext(AppContext).setErrorProp;
  const classes = useStyles();
  console.log("search");
  const { location } = useReactRouter();
  const [searchValue, setSearachValue] = useState("");
  const [songsData, setSongsData] = useState();
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [showlastRequest, setShowLastRequest] = useState(false);
  const [requestList, setRequestList] = useState([]);

  const { history } = useReactRouter();

  // Catch Error Message And Manage The Error States (isError, error)
  const errorsCatcher = useCallback((message, setErorr) => {
    setErorr(true, message);
    setTimeout(function() {
      setErorr(false, null);
    }, 3000);
  }, []);

  // (1) Check If Where Is a quey Params.
  // (2) Save query params as a search value (searchValue state)

  useEffect(() => {
    console.log("useEffect1");
    let query;
    if (location.search) {
      query = location.search.split("=");

      setSearachValue(query[1]);

      let parseSearchValue = query[1].replace(/ /g, "+");

      // Send Request To The Server
      axios
        .get(`/itunes?value=${parseSearchValue}`)
        .then(response => {
          setLoaderStatus(false);

          if (!_.isEmpty(response.data.results)) {
            setSongsData(response.data.results);
          } else {
            errorsCatcher(
              "ON! We didn't found this song, Please try another one",
              setErorr
            );
          }
        })
        .catch(error => {
          setLoaderStatus(false);
          errorsCatcher("Somthing went worg, please try again", setErorr);
        });
    }
  }, [location.search, errorsCatcher, setErorr]);

  // Get The Last 10 Search Requests From The Server
  useEffect(() => {
    console.log("useEffect2");
    axios
      .get("/requests")
      .then(res => {
        if (!_.isEmpty(res.data.data.results)) {
          setRequestList(res.data.data.results);
        }
      })
      .catch(error => {
        errorsCatcher("Somthing went worg, please try again", setErorr);
      });
  }, [errorsCatcher, setErorr]);

  // Submit The Search Request To The Server
  const submitSearch = event => {
    console.log("submitSearch");

    if (!_.isEmpty(searchValue)) {
      let parseSearchValue = searchValue.replace(/ /g, "+");
      event.preventDefault();
      axios.post(`/requests/save`, { value: parseSearchValue });
      setShowLastRequest(false);

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
              "ON! We didn't found this song, Please try another one",
              setErorr
            );
          }
        })
        .catch(error => {
          setLoaderStatus(false);
          errorsCatcher("Somthing went worg, please try again", setErorr);
        });
    }
  };

  // Manage The Last Requests List (open and close)
  const lastRequestsClicked = props => {
    console.log("lastRequestsClicked");

    if (showlastRequest) {
      setShowLastRequest(false);
    } else {
      setShowLastRequest(true);
    }
  };

  return (
    <>
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
              if (event.target.value.length > 2) {
                setSearachValue(event.target.value);
              }
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

      {loaderStatus ? (
        <Spinner />
      ) : (
        songsData && <SearchResultsList songsData={songsData} />
      )}
    </>
  );
});
