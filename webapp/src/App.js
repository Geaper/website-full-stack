import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Time from './components/Time/Time';
import Submission from './components/Submission/Submission';

const App = () => (
  <Router>
    <div className='App' style={{backgroundColor: "#f8f8fb"}}>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/submission" component={Submission} />
        <Route path="/time" component={Time} />
      </Switch>
    </div>
  </Router>
);


export default App;
