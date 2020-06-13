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
            birthDate: new Date("January 1, 2001"),
            notEqual: false,
            typeOfUser: "",        
        } 
    } 


    handleSelect = (event) => {
        this.setState({
           [event.target.name]: event.target.value 
        })
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
                alert("Tu usuario ha sido registrado")
                this.props.history.push("/home");  
            })
            .catch(error =>{
                alert("No es posible crear/modificar el usuario. " + error.response.data.message);
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
        if (event.target.name==="verifyPassword"){
            if (event.target.value !== this.state.password) {
                this.setState({ notEqual: true });
            }else {
                this.setState({ notEqual: false });
            }
        }
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
                    <div class="signup">
                        <div class="boxSignup">
                            <h1>Create your profile</h1>
                            <h2>Please fill up the form</h2>
                            <form onSubmit={this.handleSubmit} >
                                <select onChange={this.handleInput} value={this.state.typeOfUser} name="typeOfUser" className="inputBoxSignup" id="typeOfUser">
                                    <option value="">Select your type of user:</option>
                                    <option value="user">User</option>
                                    <option value="provider">Provider</option>
                                </select>
                                <br/>
                                <input id="name" placeholder="Type your name" name="name" type="text" className="inputBoxSignup" value={this.state.name} onChange={this.handleInput} />
                                <br/>
                                <input id="lastname" placeholder="Type your lastname" name="lastname" type="text" className="inputBoxSignup" value={this.state.lastname} onChange={this.handleInput} />
                                <br/>
                                <input id="password" placeholder="Type your password" name="password" type="password" className="inputBoxSignup" value={this.state.password} onChange={this.handleInput} />
                                <br/>
                                <input id="verifyPassword" placeholder="Verify your password" name="verifyPassword" type="password" className="inputBoxSignup" value={this.state.verifyPassword} onChange={this.handleInput} />
                                <br/>
                                <input id="email" placeholder="Type your email" name="email" type="text" className="inputBoxSignup" value={this.state.email} onChange={this.handleInput} />
                                <br/>
                                <input id="username" placeholder="Type your username" name="username" type="text" className="inputBoxSignup" value={this.state.username} onChange={this.handleInput} />
                                <br/>
                                <input id="documentId" placeholder="Type your Document ID" name="documentId" type="text" className="inputBoxSignup" value={this.state.documentId} onChange={this.handleInput} />
                                <br />
                                <p>Birthdate: <DatePicker selected={this.state.birthDate} onChange={this.handleChangeDate} dateFormattttt="yyyy/MM/dd" className="date" /></p>
                                <br />
                                <select onChange={this.handleInput} value={this.state.country} name="country" class="countries" id="countryId">
                                    <option value="">Select Country</option>
                                    <option value="Australia">Australia </option>
                                    <option value="Colombia">Colombia</option>
                                </select>
                                <br/>
                                <select onChange={this.handleInput} value={this.state.state} name="state" class="states" id="stateId">
                                    <option value="">Select State</option>
                                    <option value="Victoria">Victoria</option>
                                    <option value="Atlantico">Atlantico</option>
                                    <option value="Bogota">Bogota</option>
                                </select>
                                <br/>
                                <select onChange={this.handleInput} value={this.state.city} name="city" class="cities" id="cityId">
                                    <option value="">Select your city:</option>
                                    <option value="Barranquilla">Barranquilla</option>
                                    <option value="Bogota">Bogota</option>
                                    <option value="Bucaramanga">Bucaramanga</option>
                                    <option value="Cali">Cali</option>
                                    <option value="Medellin">Medellin</option>
                                    <option value="Melbourne">Melbourne</option>
                                </select>
                                <br/>
                                <input type="submit" onSubmit={this.handleSubmit} className="submit-btn" value={this.state.postId ? "Update" : "Submit"} />
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
