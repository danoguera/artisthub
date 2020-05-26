import React from 'react';
import axios from 'axios';

class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            result: "",
        } 
    } 

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("entre en handle Submit");
        axios({
            //url: "http://127.0.0.1:3000/users/signin",
            url: process.env.REACT_APP_SERVER_URL+"/users/signin",
            method: "POST",
            data: {
                email: this.state.email,
                password: this.state.password
            }
            })
            .then(response => {
                //console.log(response); 
                localStorage.setItem("token",response.data);
                this.props.onUpdate(response.data);
                this.props.history.push("/home");  //Ojo, deja de funcionar
            })
            .catch(error =>{
                console.dir(error); 
                 this.setState({ error: error,
                    password: "",
                })
             })
            .finally(() => this.setState({ loading: false })); 
    
    } 

    handleInput = (event) => {

        this.setState({
           [event.target.name]: event.target.value, 
        })    
    } 

    render(){
        if (this.state.loading){return <h1>Loading...</h1>}
      

        return (
            <main>
            <form onSubmit={this.handleSubmit} >
            <div className="login">
            <div className="box">
                <h1>Welcome to artistHub!</h1>
                <h2>Sign in and choose your service...</h2>
                <input type="text" className="inputBox" placeholder="E-mail address" value={this.state.email} onChange={this.handleInput} name="email" />
                <input type="password" className="inputBox" placeholder="Password" value={this.state.password} onChange={this.handleInput} name="password"/>
                <input type="submit" onSubmit={this.handleSubmit }  className="submit-btn" placeholder="Sign in" value="Submit" />
            </div>
            </div>
            </form>
            </main>
        )

    }
} 

export default Login;
