import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Test from './components/Test/Test';
import Submission from './components/Submission/Submission';

const App = () => (
  <Router>
    <div className='App'>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/submission" component={Submission} />
        <Route path="/test" component={Test} />
      </Switch>
    </div>
  </Router>
);


export default App;
