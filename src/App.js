import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CatchErrors from "./components/CatchErrors";
import NotFound from "./components/NotFound/NotFound";
import "./App.css";
import { errorState } from "./store/atons";
import { useRecoilState } from "recoil";

import Layout from "./components/Layout/Layout";
import { Search } from "./components/Search";
import { SongDetails } from "./components/SongDetails";

function App() {
  const [error] = useRecoilState(errorState);

  console.log(error);
  return (
    <div className="App">
      <Router>
        <CatchErrors error={error}>
          <Layout>
            <Switch>
              <Route exact path="/" component={Search} />
              <Route path="/song/:songid" component={SongDetails} />
              {/* Catch Not Found */}
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </CatchErrors>
      </Router>
    </div>
  );
}

export default App;
