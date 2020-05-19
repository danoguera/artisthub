import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'; 
import './App.css';
import Login from './pages/Login'; 
import Posts from './pages/Posts'; 
import Photographers from './pages/Photographers'; 
import Aerial from './pages/Aerial'; 
import Food from './pages/Food';
import Wedding from './pages/Wedding';
import Models from './pages/Models';
import NavBar from './components/NavBar';
import Home from './pages/Home';

class App extends React.Component {
  constructor(){
    super();
    this.state = {

    }  
  } 

  render(){ 
    return (
      <div className="App">
        <NavBar />
        <Router>
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/posts"  component={Posts}></Route>
            <Route exact path="/photographers"  component={Photographers}></Route>
            <Route exact path="/food"  component={Food}></Route>
            <Route exact path="/models"  component={Models}></Route>
            <Route exact path="/aerial"  component={Aerial}></Route>
            <Route exact path="/wedding"  component={Wedding}></Route>
            <Route exact path="/posts/:id"  component={Posts}></Route>
            <Route exact path="*"  component={Login}></Route>
          </Switch>
        </Router>

      </div>
    );
  }  
}




 

export default App;
