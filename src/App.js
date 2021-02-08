import React, { Component } from 'react';
import './App.css';

import Homepage from './pages/homepage/homepage.component';

import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header-component';
import SigninSignupPage from './pages/signin-signup/signin-signup.component';
import { auth,createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }


  /* ***The following shows how we handle awareness of our app of any auth changes from firebase:***

  open subscription: an open messaging system btw our app and firebase,
  such that whenever there's a change on firebase related to our app,
  firebase sends a message to the app. this is done in componentDidMount

  NOTE: you need to close subscription in the unmount lifecycle methods 
  to prevent memory leaks. Do this in componentWillUnmount */

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });

        });
      }

      this.setState({ currentUser: userAuth});
      console.log(this.state);


    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  

  render() {
    return <div>
      <Header currentUser={this.state.currentUser}/>
      <Switch>
      <Route exact path='/' component={Homepage}/>
      <Route exact path='/shop' component={ShopPage}/>
      <Route exact path='/signin' component={SigninSignupPage}/>

      </Switch>
    </div>
  }
}

export default App;
