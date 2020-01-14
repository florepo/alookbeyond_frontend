import React, {Component} from 'react';
import './App.css';

import {Route, Switch} from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import MainPage from './pages/MainPage'
import ARdemoPage from './pages/ARdemoPage'
import ErrorPage from './pages/ErrorPage'

class App extends Component {

  render() { 
    return (
      <React.Fragment>
        <Switch>
          <Route path="/" component={WelcomePage} exact />
          {/* <Route path="/login" component={Login} exact /> */}
          <Route path="/home" component={MainPage} exact />
          {/* <Route path="/main" component={ARView} exact /> */}
          <Route path="/demo" component={ARdemoPage} exact />
          <Route component={ErrorPage} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
