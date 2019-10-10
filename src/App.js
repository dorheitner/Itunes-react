import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CatchErrors from './components/CatchErrors'
import AppProvider from './providers/AppProvider'
import NotFound from './hoc/NotFound/NotFound'
import './App.css'

import Layout from './hoc/Layout/Layout'
import { Search } from './components/Search'
import { SongDetails } from './components/SongDetails'

function App () {
  return (
    <div className='App'>
      <Router>
        <CatchErrors>
          <AppProvider>
            <Layout>
              <Switch>
                <Route exact path='/' component={Search} />
                <Route path='/song/:songid' component={SongDetails} />
                {/* Catch Not Found */}
                <Route component={NotFound} />
              </Switch>
            </Layout>
          </AppProvider>
        </CatchErrors>
      </Router>
    </div>
  )
}

export default App
