import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'; 
import './App.css';
import Login from './pages/Login'; 
import Posts from './pages/Posts'; 
import Photographers from './pages/Photographers'; 
import NavBar from './components/NavBar';
import Home from './pages/Home';
import HomeProvider from './pages/HomeProvider';
import List from './pages/List';
import SignOut from './pages/SignOut';
import SignUp from './pages/SignUp';
import CreatePost from './pages/CreatePost';
import ListProviderPosts from './pages/ListProviderPosts';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      token:""
    }  
  } 

  componentDidMount(){
    if (localStorage.getItem("token") !== null){
      this.setState({
        token: localStorage.getItem("token"),
      } )
    } 
  } 
  updateTokenStatus = (token) => {

    this.setState({
      token
    });

  } 

  render(){ 
    return (
      <div className="App">


        <Router>
          <NavBar token={this.state.token}  />
          <Switch>
          <Route exact path='/' render={(props) => <Login {...props}  onUpdate={this.updateTokenStatus}/> }/>
            <Route exact path='/login' render={(props) => <Login {...props}  onUpdate={this.updateTokenStatus}/> }/>
            <UserRoute exact path="/home" component={Home}></UserRoute>
            <ProviderRoute exact path="/homeProvider" component={HomeProvider}></ProviderRoute>
            <ProviderRoute exact path="/list" component={ListProviderPosts}></ProviderRoute>
            <UserRoute exact path="/posts"  component={Posts}></UserRoute>
            <UserRoute exact path="/photographers"  component={Photographers}></UserRoute>
            <UserRoute exact path="/food"  component={List}></UserRoute>
            <UserRoute exact path="/models"  component={List}></UserRoute>
            <UserRoute exact path="/aerial"  component={List}></UserRoute>
            <UserRoute exact path="/wedding"  component={List}></UserRoute>
            <ProviderRoute exact path="/posts/create"  component={CreatePost}></ProviderRoute>
            <ProviderRoute exact path="/posts/create/:id"  component={CreatePost}></ProviderRoute>
            <GenericRoute exact path="/posts/:id"  component={Posts}></GenericRoute>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/signout" render={(props) => <SignOut {...props}  onUpdate={this.updateTokenStatus}/> }/>
            <Route exact path="*"  component={Login}></Route>
          </Switch>
        </Router>

      </div>
    );
  }  
}


function GenericRoute(props){

  const token = localStorage.getItem("token");
  if (!token){
    return <Redirect to="/login"></Redirect>
  } 
  return (<Route {...props} ></Route>);    
}

function UserRoute(props){

  const token = localStorage.getItem("token");
  const typeOfUser = localStorage.getItem("typeOfUser");
  if (!token){
    return <Redirect to="/login"></Redirect>
  } 

  if ( token && typeOfUser==="user" ){
    return (<Route {...props} ></Route>);    
  } 
  return <Redirect to="/homeProvider"></Redirect>
} 

function ProviderRoute(props){
  const token = localStorage.getItem("token");
  const typeOfUser = localStorage.getItem("typeOfUser");
  if (!token){
    return <Redirect to="/login"></Redirect>
  } 
  if ( token && typeOfUser==="provider" ){
    return (<Route {...props} ></Route>);    
  } 
  return <Redirect to="/home"></Redirect>
} 

 

export default App;
