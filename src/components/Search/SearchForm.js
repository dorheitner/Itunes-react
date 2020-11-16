import React, { useState } from "react";

import axios from "../../axios-itunes";
import isEmpty from "lodash.isempty";
import { useRecoilState } from "recoil";
import useReactRouter from "use-react-router";
import { InputBase, IconButton, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import compose from "ramda.compose";
import { errorState } from "../../store/atons";
import { GetLastRequests } from "../GetLastRequests";

const useStyles = makeStyles((theme) => ({
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

export default function SearchForm(props) {
  const [, setError] = useRecoilState(errorState);

  const classes = useStyles();

  const { location } = useReactRouter();
  const { history } = useReactRouter();

  const [showlastRequest, setShowLastRequest] = useState(false);
  const [parseQueryRequest, setParseQueryRequest] = useState(false);

  // Manage The Last Requests List (open and close)
  const lastRequestsClicked = (props) => {
    if (showlastRequest) {
      return setShowLastRequest(false);
    }
    return setShowLastRequest(true);
  };

  const updateUrlQueryParam = (searchValue) => {
    console.log(searchValue);
    history.push({
      pathname: "/",
      search: `?q=${searchValue}`,
    });
    props.updateState("setLoaderStatus", true);
  };

  const parseSearchValueFun = (searchValue) => {
    console.log(searchValue);
    const parseSearchValue = searchValue.replace(/ /g, "+");
    setParseQueryRequest(parseSearchValue);
    axios.post(`/requests/save`, { value: parseSearchValue });
    setShowLastRequest(false);
    return searchValue;
  };

  const sendRequestToTheServer = () => {
    axios
      .get(`/itunes?value=${parseQueryRequest}`)
      .then((response) => {
        props.updateState("setLoaderStatus", false);
        if (!isEmpty(response.data.results)) {
          props.updateState("setSongsData", response.data.results);
        } else {
          setError({
            message: "ON! We didn't found this song, Please try another one",
            error: null,
          });
        }
      })
      .catch((error) => {
        props.updateState("setLoaderStatus", false);
        setError({
          message: "Somthing went worg, please try again",
          error,
        });
      });
  };

  // Submit The Search Request To The Server
  const submitSearch = (event) => {
    event.preventDefault();

    if (!isEmpty(props.searchValue)) {
      setParseQueryRequest(props.searchValue);
      const composeSubmitSearch = compose(
        sendRequestToTheServer,
        updateUrlQueryParam,
        parseSearchValueFun
      );
      composeSubmitSearch(props.searchValue);
    }
  };

  return (
    <>
      <form className={classes.form} noValidate autoComplete="off">
        <IconButton
          className={classes.iconButton}
          aria-label="menu"
          onClick={lastRequestsClicked}
        >
          <MenuIcon />
        </IconButton>
        <InputBase
          id="inputBase"
          onBlur={showlastRequest ? lastRequestsClicked : null}
          className={classes.input}
          placeholder="Find a song"
          inputProps={{ "aria-label": "find a song" }}
          onChange={(event) => {
            location.search = "";
            if (event.target.value.length > 2) {
              props.updateState("setSearchValue", event.target.value);
            }
          }}
        />
        <Button
          onClick={submitSearch}
          size="small"
          type="submit"
          className={classes.searchButton}
        >
          <SearchIcon />
        </Button>
      </form>
      <div className="lastRequestsWrapper" onBlur={lastRequestsClicked}>
        {showlastRequest ? <GetLastRequests list={props.requestList} /> : null}
      </div>
    </>
  );
}
