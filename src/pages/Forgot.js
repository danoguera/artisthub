import React from 'react';
import axios from 'axios';
import './SignUp.css';

class Forgot extends React.Component{
    constructor(){
        super();
        this.state = {
            email: "",
            typeOfUser: "",        
        } 
    } 


    handleSubmit = (event) => {
        event.preventDefault();
        let url;
        if (this.state.typeOfUser==="provider"){
            url= process.env.REACT_APP_SERVER_URL+"/provider/recover";
        } else{
            url= process.env.REACT_APP_SERVER_URL+"/users/recover";
        } 
        const { email } = this.state; 
        axios({
            url,
            method: "POST",
            headers: {  },
            data: {
                email
            }
            })
            .then(response => {
                alert("Please check your email and follow the instructions")
                this.props.history.push("/login");  
            })
            .catch(error =>{
                alert("Error" + error.response.data.message);
                 this.setState({ 
                    error: error.response.data.message,
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
                <section>
                    <div className="signup">
                        <div className="boxSignup">
                            <h1>Recover your password</h1>
                            <h2>Please fill up the form</h2>
                            <form onSubmit={this.handleSubmit} >
                                <select onChange={this.handleInput} data-testid="typeOfUser" value={this.state.typeOfUser} name="typeOfUser" className="inputBoxSignup" id="typeOfUser">
                                    <option value="">Select your type of user:</option>
                                    <option value="user">User</option>
                                    <option value="provider">Provider</option>
                                </select>
                                <br/>
                                <input id="email" placeholder="Type your email" name="email" type="text" className="inputBoxSignup" value={this.state.email} onChange={this.handleInput} />
                                <br/>

                                <input type="submit" data-testid="submit-btn" onSubmit={this.handleSubmit} className="submit-btn" value={this.state.postId ? "Update" : "Submit"} />
                                <br/>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
} 

export default Forgot;
