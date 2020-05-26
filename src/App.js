import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'; 
import './App.css';
import Login from './pages/Login'; 
import Posts from './pages/Posts'; 
import Photographers from './pages/Photographers'; 
import NavBar from './components/NavBar';
import Home from './pages/Home';
import List from './pages/List';
import SignOut from './pages/SignOut';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      token:""
    }  
  } 

  updateTokenStatus = (token) => {
    console.log("Entre en el updateTokenStatus!");
    this.setState({
      token
    });

  } 
  //<Route exact path="/login" component={Login}></Route>
  render(){ 
    return (
      <div className="App">


        <Router>
          <NavBar token={this.state.token}  />
          <Switch>
            <Route exact path='/login' render={(props) => <Login {...props}  onUpdate={this.updateTokenStatus}/> }/>
            <PrivateRoute exact path="/home" component={Home}></PrivateRoute>
            <PrivateRoute exact path="/posts"  component={Posts}></PrivateRoute>
            <PrivateRoute exact path="/photographers"  component={Photographers}></PrivateRoute>
            <PrivateRoute exact path="/food"  component={List}></PrivateRoute>
            <PrivateRoute exact path="/models"  component={List}></PrivateRoute>
            <PrivateRoute exact path="/aerial"  component={List}></PrivateRoute>
            <PrivateRoute exact path="/wedding"  component={List}></PrivateRoute>
            <PrivateRoute exact path="/posts/:id"  component={Posts}></PrivateRoute>
            <Route exact path="/signout" render={(props) => <SignOut {...props}  onUpdate={this.updateTokenStatus}/> }/>
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
