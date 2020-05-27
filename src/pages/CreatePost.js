import React from 'react';
import axios from 'axios';

class CreatePost extends React.Component{
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            result: "",
            subcategoryList: [] ,
            subcategory: "",
            category: "",
            country: "",
            state: "",
            city: "",
            title: "", 
            description: "", 
            post_image: "",

        } 
    } 

    handleSelect = (event) => {
        console.log("Name:",event.target.name, "Valor:",event.target.value)
        this.setState({
           [event.target.name]: event.target.value 
        })
        if (event.target.value="photography"){
            this.setState({
                subcategoryList:["aerial","model","food","wedding"]  
            })
         } 
    } 

    handleSubmit = (event) => {
        event.preventDefault();
        const {title, description, city, state, country, subcategory, category, post_image} = this.state; 
        axios({
            url: process.env.REACT_APP_SERVER_URL+"/posts/",
            method: "POST",
            headers: { "Authorization": localStorage.getItem("token") },
            data: {
                title,
                description,
                city,
                state, 
                country,
                subcategory,
                category,
                post_image,
            }
            })
            .then(response => {
                console.log(response.data);
                //localStorage.setItem("token",response.data);
                //this.props.onUpdate(response.data);
                this.props.history.push("/posts/"+response.data._id);  
            })
            .catch(error =>{
                console.log(error);
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
                    <h1>Create your service</h1>
                    <h2>Please fill the form...</h2>
                    <label htmlFor="title" >Title: </label>
                    <input id="title" name="title" type="text" className="inputBox" placeholder="Title..." value={this.state.title} onChange={this.handleInput} />
                    <label htmlFor="description"> Description: </label>
                    <textarea id="description" name="description" className="inputBox" placeholder="Describe your service ..." value={this.state.description} onChange={this.handleInput} />
                    <label htmlFor="category">Choose a service:</label>
                    <select name="category" onChange={this.handleSelect} id="category">
                        <option value="music">Music</option>
                        <option value="photography">Photography</option>
                        <option value="videography">Videography</option>
                    </select>
                    <br />

                    <label htmlFor="subcategory">Choose a subcategory:</label>
                    <select value={this.state.subcategory} name="subcategory" id="subcategory" onChange={this.handleSelect} >
                        {this.state.subcategoryList.map(option => (
                            <option value={option} > {option.charAt(0).toUpperCase() + option.slice(1)} </option>
                        )
                        )};
                </select>
                <br />

                    <label htmlFor="post_image" >Title: </label>
                    <input id="post_image" name="post_image" type="text" className="inputBox" placeholder="Ruta a la foto..." value={this.state.post_image} onChange={this.handleInput} />
                    <br />

                    <select onChange={this.handleInput} name="country" class="countries" id="countryId">
                        <option value="">Select Country</option>
                        <option value="Australia">Australia </option>
                        <option value="Colombia">Colombia</option>
                    </select>
                    <select onChange={this.handleInput} name="state" class="states" id="stateId">
                        <option value="">Select State</option>
                        <option value="Victoria">Victoria</option>
                        <option value="Atlantico">Atlantico</option>
                        <option value="Bogota">Bogota</option>
                    </select>
                    <select onChange={this.handleInput} name="city" class="cities" id="cityId">
                        <option value="Bogota">Bogota</option>
                        <option value="Barranquilla">Curramba</option>
                        <option value="Melbourne">Melbourne</option>
                    </select>
                    <br />

                    <input type="submit" onSubmit={this.handleSubmit} className="submit-btn" placeholder="Sign in" value="Submit" />
                </form>
            </main>
        )

    }
} 

export default CreatePost;
