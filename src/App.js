import React, {Component} from 'react';
import './App.css';

import {Route, Switch} from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import MainPage from './pages/MainPage'
import DemoPage from './pages/DemoPage'
import View1 from './pages/View1'
import ErrorPage from './pages/ErrorPage'

class App extends Component {

  render() { 
    return (
      <React.Fragment>
        <Switch>
          <Route path="/" component={WelcomePage} exact />
          <Route path="/home" component={MainPage} exact />
          <Route path="/demo" component={DemoPage} exact />
          <Route path="/view1" component={View1} exact />
          <Route path="/view2" component={DemoPage} exact />
          <Route path="/view3" component={DemoPage} exact />
          <Route path="/view4" component={DemoPage} exact />

          <Route component={ErrorPage} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
