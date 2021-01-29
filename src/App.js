import React, { Component } from 'react';
import './App.css';

import Homepage from './pages/homepage/homepage.component';

import { Switch, Route, Link } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';


class App extends Component {
  render() {
    return <div>
      <Switch>
      <Route exact path='/' component={Homepage}/>
      <Route exact path='/shop' component={ShopPage}/>

      </Switch>
    </div>
  }
}

export default App;
