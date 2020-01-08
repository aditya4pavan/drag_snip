import React from 'react';
import './App.css';
import RoadView from './road';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';


export default function () {
  return (
    <Router>
      <Switch>
        <Route exact path='/:id' component={RoadView} />
      </Switch>
    </Router>
  )
}

//export default App;
