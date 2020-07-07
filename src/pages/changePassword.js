import React from 'react';
import axios from 'axios';
import './SignUp.css';

function queryString(query){
    const res = {};
    query.replace(/\?/, '').split("&").forEach(q => {
        const [key, value] = q.split("=");
        res[key] = value;
    });
    return res;
}


class changePassword extends React.Component{
    constructor(){
        super();
        this.state = {
            password: "",
            verifyPassword: "",
            typeOfUser: "",        
        } 
    } 


    handleSubmit = (event) => {
        event.preventDefault();
        const {token, typeOfUser } = queryString(this.props.location.search);
        let url;
        if (typeOfUser==="provider"){
            url= process.env.REACT_APP_SERVER_URL+"/provider/updatepassword";
        } else{
            url= process.env.REACT_APP_SERVER_URL+"/users/updatepassword";
        } 
        const { password } = this.state; 

        axios({
            url,
            method: "PUT",
            headers: { "Authorization": token },
            data: {
                password,
            }
            })
            .then(response => {
                alert("Tu clave ha sido cambiada")
                this.props.history.push("/login");  
            })
            .catch(error =>{
                alert("No es posible modificar el password. " + error.response.data.message);
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
                            <h1>Change your password</h1>
                            <h2>Please fill up the form</h2>
                            <form onSubmit={this.handleSubmit} >
                                <input id="password" placeholder="Type your password" name="password" type="password" className="inputBoxSignup" value={this.state.password} onChange={this.handleInput} />
                                <br/>
                                <input id="verifyPassword" placeholder="Verify your password" name="verifyPassword" type="password" className="inputBoxSignup" value={this.state.verifyPassword} onChange={this.handleInput} />
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

export default changePassword;
