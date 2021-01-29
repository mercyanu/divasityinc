import React, { Component } from 'react';
import './App.css';

import Homepage from './pages/homepage/homepage.component';

import { Switch, Route, Link } from 'react-router-dom';

const HatsPage = () => (
  <div>
    <h1> HATS PAGE</h1>
  </div>
)

const Home = props =>{  
  console.log(props);
  return(
    <div>
      <button onClick={() => props.history.push('/topics')}>Go To Topics</button>
      <button href='/topics'>Link too</button>
        <h1>HOME PAGE HERE</h1>

    </div>
    );
}

  const TopicsList = (props) =>{
    console.log(props);
    return(
      <div>
        <h1>TODAY TOPICS HERE</h1>
        <Link to={`${props.match.url}/:13`}>TOPIC 13</Link>
        <Link to={`${props.match.url}/:14`}>TOPIC 14</Link>
        <Link to={`${props.match.url}/:15`}>TOPIC 15</Link>

      </div>
  );

  }

  const TopicDetail = (props) =>{
    console.log(props);
    return (
    <h1>ISSUE {props.match.params.topicId} DETAILS</h1>
  );

  }

class App extends Component {
  render() {
    return <div>
      <Route exact path='/' component={Homepage}/>
      <Route exact path='/hats' component={HatsPage}/>
      <Route exact path='/topics' component={TopicsList}/>
      <Route exact path='/topics/:topicId' component={TopicDetail}/>
      
      
    </div>
  }
}

export default App;
