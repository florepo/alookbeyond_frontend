import React, {Component} from 'react';
import './App.css';

import {Route, Switch} from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import MainPage from './pages/MainPage'
import DemoPage from './pages/DemoPage'
import View1 from './pages/View1'
<<<<<<< HEAD
=======
import View2 from './pages/View2'
import View3 from './pages/View3'
import View4 from './pages/View4'

>>>>>>> refactoring
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
          <Route path="/view2" component={View2} exact />
          <Route path="/view3" component={View3} exact />
          <Route path="/view4" component={View4} exact />

          <Route component={ErrorPage} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
