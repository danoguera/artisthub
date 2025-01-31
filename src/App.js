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
import ListCategory from './pages/ListCategory';
import Payment from './pages/Payment';
import PaymentResponse from './pages/PaymentResponse';
import Forgot from './pages/Forgot';
import changePassword from './pages/changePassword';
import Contact from './pages/Contact';
import Hire from './pages/Hire';
import ServicePaymentResponse from './pages/ServicePaymentResponse';

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
            <UserRoute exact path="/Wedding"  component={List}></UserRoute>
            <UserRoute exact path="/catsub/:category/:subcategory"  component={List}></UserRoute>
            <UserRoute exact path="/category/:id"  component={ListCategory}></UserRoute>
            <UserRoute exact path="/contact/:id"  component={Contact}></UserRoute>
            <UserRoute exact path="/hire/:id"  component={Hire}></UserRoute>
            <UserRoute exact path="/servicepaymentresponse/:id"  component={ServicePaymentResponse}></UserRoute>
            <ProviderRoute exact path="/posts/create"  component={CreatePost}></ProviderRoute>
            <ProviderRoute exact path="/posts/create/:id"  component={CreatePost}></ProviderRoute>
            <GenericRoute exact path="/posts/:id"  component={Posts}></GenericRoute>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/signout" render={(props) => <SignOut {...props}  onUpdate={this.updateTokenStatus}/> }/>
            <ProviderRoute exact path="/payment" component={Payment}></ProviderRoute>
            <ProviderRoute exact path="/paymentresponse" component={PaymentResponse}></ProviderRoute>
            <Route exact path="/forgot" component={Forgot}></Route>
            <Route exact path="/changepassword" component={changePassword}></Route>
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
