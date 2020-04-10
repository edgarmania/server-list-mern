import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { ServerList, ServerInsert, ServerUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App(){
  return(
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/" exact component={ServerList} />
        <Route path="/server-create" exact component={ServerInsert} />
        <Route path="/server-update/:id" exact component={ServerUpdate} />
      </Switch>
    </Router>
  )
}



export default App
