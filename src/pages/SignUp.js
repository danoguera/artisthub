import React from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
        } 
    } 

    componentDidMount(){
        const postId = this.props.match.params.id;
        if (postId){
            axios({
                url: process.env.REACT_APP_SERVER_URL+"/posts/"+postId,
                method: "GET",
                headers: { "Authorization": localStorage.getItem("token") },
                })
                .then(response => {
                    const {description, title, country, city, state, category, subcategory, post_image} = response.data; 
                    this.setState({
                        description, title, country, city, state, 
                        category, subcategory, post_image, postId: postId
                    });
                })
                .catch(error =>{
                     this.setState({ error: error})
                 })
                .finally(() => this.setState({ loading: false })); 
        } 
    } 

    handleSelect = (event) => {
        this.setState({
           [event.target.name]: event.target.value 
        })
    } 

    handleSubmit = (event) => {
        event.preventDefault();
        let method, url;
        if (this.state.postId){
            method= "PUT";
            url=process.env.REACT_APP_SERVER_URL+"/posts/"+this.state.postId;
        } else{
            method= "POST";
            url= process.env.REACT_APP_SERVER_URL+"/users/signup";
        } 
        const {name, lastname, password, state, country, city, email, username, documentId, birthDate} = this.state; 
        axios({
            url,
            method,
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
                //console.log(response);
                alert("Tu usuario ha sido registrado")
                this.props.history.push("/home");  
            })
            .catch(error =>{
                console.log(error.response);
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
                <form onSubmit={this.handleSubmit} >
                    <h1>Create your profile</h1>
                    <h2>Please fill the form... {this.state.error}</h2>
                    <label htmlFor="name"> Name: </label>
                    <input id="name" name="name" type="text" className="inputBox" value={this.state.name} onChange={this.handleInput} />
                    <label htmlFor="lastname"> Lastname: </label>
                    <input id="lastname" name="lastname" type="text" className="inputBox" value={this.state.lastname} onChange={this.handleInput} />
                    <label htmlFor="password"> Password: </label>
                    <input id="password" name="password" type="password" className="inputBox" value={this.state.password} onChange={this.handleInput} />
                    <label htmlFor="veryfyPassword"> Repeat password: {this.state.notEqual ? "Please verify you are typing the same password" : ""} </label>
                    <input id="verifyPassword" name="verifyPassword" type="password" className="inputBox" value={this.state.verifyPassword} onChange={this.handleInput} />
                    <label htmlFor="email"> Email: </label>
                    <input id="email" name="email" type="text" className="inputBox" value={this.state.email} onChange={this.handleInput} />
                    <label htmlFor="username"> Username: </label>
                    <input id="username" name="username" type="text" className="inputBox" value={this.state.username} onChange={this.handleInput} />
                    <label htmlFor="documentId"> Document ID: </label>
                    <input id="documentId" name="documentId" type="text" className="inputBox" value={this.state.documentId} onChange={this.handleInput} />
                    <label htmlFor="birthDate"> Birth Date:</label>
                    <DatePicker selected={this.state.birthDate} onChange={this.handleChangeDate}  dateFormattttt="yyyy/MM/dd" />

                    <select onChange={this.handleInput} value = {this.state.country} name="country" class="countries" id="countryId">
                        <option value="">Select Country</option>
                        <option value="Australia">Australia </option>
                        <option value="Colombia">Colombia</option>
                    </select>
                    <select onChange={this.handleInput} value={this.state.state} name="state" class="states" id="stateId">
                        <option value="">Select State</option>
                        <option value="Victoria">Victoria</option>
                        <option value="Atlantico">Atlantico</option>
                        <option value="Bogota">Bogota</option>
                    </select>
                    <select onChange={this.handleInput} value = {this.state.city} name="city" class="cities" id="cityId">
                        <option value="Bogota">Bogota</option>
                        <option value="Barranquilla">Curramba</option>
                        <option value="Melbourne">Melbourne</option>
                    </select>
                    <br/>
                    <br/>

                    <input type="submit" onSubmit={this.handleSubmit} className="submit-btn"  value={this.state.postId ? "Update" : "Submit"}  />
                </form>
            </main>
        )

    }
} 

export default SignUp;
