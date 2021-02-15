import React, { Component } from 'react';
import './App.css';

import Homepage from './pages/homepage/homepage.component';

import { Switch, Route, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header-component';
import SigninSignupPage from './pages/signin-signup/signin-signup.component';
import { auth,createUserProfileDocument } from './firebase/firebase.utils';

import { connect } from 'react-redux';
import setCurrentUserAction from './redux/user/user-actions';

class App extends React.Component {

//we do not need this constructor to set default state value as reduer now does that
  // constructor(){
  //   super();

  //   this.state = {
  //     currentUser: null
  //   }
  // }


  /* ***The following shows how we handle awareness of our app of any auth changes from firebase:***

  open subscription: an open messaging system btw our app and firebase,
  such that whenever there's a change on firebase related to our app,
  firebase sends a message to the app. this is done in componentDidMount

  NOTE: you need to close subscription in the unmount lifecycle methods 
  to prevent memory leaks. Do this in componentWillUnmount */

  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          // the destructured setCurrentUser props is used within this component to update our state 
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          });
        });
      }

      //use the setCurrentUSer props to update state
      setCurrentUser(userAuth);

    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render() {
    return <div>
      <Header/>
      <Switch>
      <Route exact path='/' component={Homepage}/>
      <Route exact path='/shop' component={ShopPage}/>
      <Route exact path='/signin' 
      render={() => 
        this.props.currentUser ?
        (<Redirect to='/' />) :
        (<SigninSignupPage/>)}
      />

      </Switch>
    </div>
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUserAction(user)) //here we dispatch the needed action across all reducers
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
