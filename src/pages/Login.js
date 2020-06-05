import React from 'react';
import axios from 'axios';

class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            result: "",
            isProvider: false
        } 
    } 

    componentDidMount() {
        localStorage.removeItem("token");
        localStorage.removeItem("typeOfUser");
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const url = this.state.isProvider ? process.env.REACT_APP_SERVER_URL+"/provider/signin"
                    : process.env.REACT_APP_SERVER_URL+"/users/signin";

        axios({
            url,
            method: "POST",
            data: {
                email: this.state.email,
                password: this.state.password
            }
            })
            .then(response => {
    
                localStorage.setItem("token",response.data);
                this.props.onUpdate(response.data);
                if (this.state.isProvider){
                    localStorage.setItem("typeOfUser","provider");
                    this.props.history.push("/homeProvider"); 
                } else{  
                    localStorage.setItem("typeOfUser","user");
                    this.props.history.push("/home");  
                }
            })
            .catch(error =>{
                 this.setState({ error: error,
                    password: "",
                })
             })
            .finally(() => this.setState({ loading: false })); 
    
    } 

    handleInput = (event) => {
        let value = event.target.name ==="isProvider" ? event.target.checked : event.target.value;
        this.setState({
           [event.target.name]: value, 
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
                            <input type="password" className="inputBox" placeholder="Password" value={this.state.password} onChange={this.handleInput} name="password" />
                            <label htmlFor="isProvider">Are you a provider?</label><input type="checkbox" name="isProvider" id="isProvider" checked={this.state.isProvider} onChange={this.handleInput} className="check"/>  <br />
                            <input type="submit" onSubmit={this.handleSubmit} className="submit-btn" placeholder="Sign in" value="Submit" />
                        </div>
                    </div>
                </form>
            </main>
        )
    }
} 

export default Login;
