import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'; 
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
            <PrivateRoute exact path="/home" component={Home}></PrivateRoute>
            <PrivateRoute exact path="/posts"  component={Posts}></PrivateRoute>
            <PrivateRoute exact path="/photographers"  component={Photographers}></PrivateRoute>
            <PrivateRoute exact path="/food"  component={Food}></PrivateRoute>
            <PrivateRoute exact path="/models"  component={Models}></PrivateRoute>
            <PrivateRoute exact path="/aerial"  component={Aerial}></PrivateRoute>
            <PrivateRoute exact path="/wedding"  component={Wedding}></PrivateRoute>
            <PrivateRoute exact path="/posts/:id"  component={Posts}></PrivateRoute>
            <PrivateRoute exact path="*"  component={Login}></PrivateRoute>
          </Switch>
        </Router>

      </div>
    );
  }  
}


function PrivateRoute(props){

  const token = localStorage.getItem("token");

  if (!token){
    return <Redirect to="/login"></Redirect>
  } 

  return (<Route {...props} ></Route>);


} 



 

export default App;
