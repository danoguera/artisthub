import React from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './SignUp.css';

class SignUp extends React.Component{
    constructor(){
        super();
        this.state = {
            name: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
            verifyPassword: "",
            documentId: "",
            result: "",
            country: "",
            state: "",
            city: "",
            birthDate: new Date("January 1, 1980"),
            notEqual: false,
            typeOfUser: "",        
        } 
    } 


    handleSubmit = (event) => {
        event.preventDefault();
        let url;
        if (this.state.typeOfUser==="provider"){
            url= process.env.REACT_APP_SERVER_URL+"/provider/signup";
        } else{
            url= process.env.REACT_APP_SERVER_URL+"/users/signup";
        } 
        const {name, lastname, password, state, country, city, email, username, documentId, birthDate} = this.state; 
        axios({
            url,
            method: "POST",
            headers: {  },
            data: {
                name,
                lastname,
                username,
                email,
                password,
                city,
                state,
                country,
                documentId,
                birthDate,
            }
            })
            .then(response => {
                this.props.history.push("/login");
            })
            .catch(error =>{
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

    handleChangeDate = date => {
        this.setState({
          birthDate: date
        });
      };

    render(){
        if (this.state.loading){return <h1>Loading...</h1>}
      
        return (
            <main>
                <section>
                    <div className="signupFrame">
                        <div className="boxSignup">
                            <h1>Create your profile</h1>
                            {/* <h2>Please fill up the form</h2> */}
                            <form onSubmit={this.handleSubmit} >
                                <select onChange={this.handleInput} data-testid="typeOfUser" value={this.state.typeOfUser} name="typeOfUser" className="select" id="typeOfUser">
                                    <option value="">Select your type of user:</option>
                                    <option value="user">User</option>
                                    <option value="provider">Provider</option>
                                </select>
                                <br/>
                                <input id="name" data-testid="name" placeholder="Type your Name" name="name" type="text" className="inputBoxSignup" value={this.state.name} onChange={this.handleInput} />
                                <br/>
                                <input id="lastname" placeholder="Type your Last Name" name="lastname" type="text" className="inputBoxSignup" value={this.state.lastname} onChange={this.handleInput} />
                                <br/>
                                <input id="password" placeholder="Type your password" name="password" type="password" className="inputBoxSignup" value={this.state.password} onChange={this.handleInput} />
                                <br/>
                                <input id="verifyPassword" placeholder="Verify your password" name="verifyPassword" type="password" className="inputBoxSignup" value={this.state.verifyPassword} onChange={this.handleInput} />
                                <br/>
                                <input id="email" placeholder="Type your email" name="email" type="text" className="inputBoxSignup" value={this.state.email} onChange={this.handleInput} />
                                <br/>
                                {/* <input id="username" placeholder="Type your username" name="username" type="text" className="inputBoxSignup" value={this.state.username} onChange={this.handleInput} />
                                <br/> */}
                                <input id="documentId" placeholder="Type your Document ID" name="documentId" type="text" className="inputBoxSignup" value={this.state.documentId} onChange={this.handleInput} />
                                <br />
                                <p>Birthdate: <DatePicker selected={this.state.birthDate} onChange={this.handleChangeDate} dateFormattttt="yyyy/MM/dd" className="date" /></p>
                                <br />
                                <select onChange={this.handleInput} value={this.state.country} name="country" className="countries" id="countryId">
                                    <option value="">Select Country</option>
                                    <option value="Australia">Australia </option>
                                    <option value="Colombia">Colombia</option>
                                </select>
                                <br/>
                                <select onChange={this.handleInput} value={this.state.state} name="state" className="states" id="stateId">
                                    <option value="">Select State</option>
                                    <option value="Victoria">Victoria</option>
                                    <option value="Atlantico">Atlantico</option>
                                    <option value="Bogota">Bogota</option>
                                </select>
                                <br/>
                                <select onChange={this.handleInput} value={this.state.city} name="city" className="cities" id="cityId">
                                    <option value="">Select your city:</option>
                                    <option value="Barranquilla">Barranquilla</option>
                                    <option value="Bogota">Bogota</option>
                                    <option value="Bucaramanga">Bucaramanga</option>
                                    <option value="Cali">Cali</option>
                                    <option value="Medellin">Medellin</option>
                                    <option value="Melbourne">Melbourne</option>
                                </select>
                                <br/>
                                <h5>In order to complete your subscription and offer your service(s) you will be asked to pay a monthly fee of $5,000 which covers the use of our platform.</h5>
                                <br />
                                <input type="submit" data-testid="submit-btn" onSubmit={this.handleSubmit} className="submit-btn" value={this.state.postId ? "Update" : "Submit"} />
                                {this.state.error ? <div className="warning">The user couldn't be created.</div> : null}
                                <br/>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        )

    }
} 

export default SignUp;
