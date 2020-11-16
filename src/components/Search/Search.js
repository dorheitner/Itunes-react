import React, { useState, useEffect, useCallback } from "react";

import axios from "../../axios-itunes";
import Searchform from "./SearchForm";

import isEmpty from "lodash.isempty";
import useReactRouter from "use-react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { errorState } from "../../store/atons";

import { SearchResultsList } from "./SearchResultsList";
import { Spinner } from "../UI/Spinner";

import { useRecoilState } from "recoil";

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

export default React.memo(function Search(props) {
  const [, setError] = useRecoilState(errorState);

  const classes = useStyles();

  const { location } = useReactRouter();

  const [searchValue, setSearachValue] = useState("");
  const [songsData, setSongsData] = useState();
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [requestList] = useState([]);

  // (1) Check If Where Is a quey Params.
  // (2) Save query params as a search value (searchValue state)

  const searchSong = useCallback(
    (parseSearchValue) => {
      axios
        .get(`/itunes?value=${parseSearchValue}`)
        .then((response) => {
          setLoaderStatus(false);

          if (!isEmpty(response.data.results)) {
            setSongsData(response.data.results);
            setError({});
          } else {
            setError({
              message: "ON! We didn't found this song, Please try another one",
              error: null,
            });
          }
        })
        .catch((error) => {
          setLoaderStatus(false);
          setError({
            message: "Somthing went worg, please try again",
            error: error,
          });
        });
    },
    [setError]
  );

  useEffect(() => {
    if (location.search) {
      const query = location.search.split("=");

      setSearachValue(query[1]);

      let parseSearchValue = query[1].replace(/ /g, "+");

      // Send Request To The Server
      searchSong(parseSearchValue);
    }
    // Get The Last 10 Search Requests From The Server
  }, [location.search, searchSong]);

  const updateStateMethod = {
    setSearchValue: (value) => setSearachValue(value),
    setLoaderStatus: (value) => setLoaderStatus(value),
    setSongsData: (value) => setSongsData(value),
  };

  const updateState = (stateType, value) => {
    updateStateMethod[stateType](value);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Searchform
          searchValue={searchValue}
          updateState={updateState}
          songsData={songsData}
          requestList={requestList}
        />
      </Paper>

      {loaderStatus ? (
        <Spinner />
      ) : (
        songsData && <SearchResultsList songsData={songsData} />
      )}
    </>
  );
});
