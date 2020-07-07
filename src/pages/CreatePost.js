import React from 'react';
import axios from 'axios';
import './CreatePost.css';

class CreatePost extends React.Component{
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            result: "",
            subcategoryList:["aerial","model","food","wedding"],
            subcategory: "",
            category: "",
            country: "",
            state: "",
            city: "",
            title: "", 
            description: "", 
            post_image: "",
            fare: "",
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
                    const {description, title, country, city, state, category, subcategory, post_image, fare} = response.data; 
                    this.setState({
                        description, title, country, city, state, 
                        category, subcategory, post_image, fare, postId: postId
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

    handleSubmit = async(event) => {
        event.preventDefault();
        let method, url;
        if (this.state.postId){
            method= "PUT";
            url=process.env.REACT_APP_SERVER_URL+"/posts/"+this.state.postId;
        } else{
            method= "POST";
            url= process.env.REACT_APP_SERVER_URL+"/posts/";
        }
        const fd = new FormData();
        if (this.state.selectedFile) {
            fd.append('photo',this.state.selectedFile,"photo");
        }
        
        const {title, description, city, state, country, subcategory, category, fare} = this.state; 
 
        fd.set("title", title);
        fd.set("description", description);
        fd.set("city", city);
        fd.set("state", state);
        fd.set("country", country);
        fd.set("subcategory", subcategory);
        fd.set("category", category);
        fd.set("fare", fare);

        axios({
            url,
            method,
            headers: { "Authorization": localStorage.getItem("token"),
                        'Content-Type': 'multipart/form-data' },
            data: fd,
            })
            .then(response => {
                this.props.history.push("/posts/"+response.data._id);  
            })
            .catch(error =>{
                alert("No es posible crear/modificar el post");
                 this.setState({ error: error,
                    password: "",
                })
             })
            .finally(() => this.setState({ loading: false })); 
    
    } 

    fileSelectedHandler = (event) => {
        this.setState({ 
          selectedFile: event.target.files[0],
        })
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
                    <div className="service">
                        <div className="boxService">
                            <h1>Create your Service</h1>
                            <form onSubmit={this.handleSubmit} >
                                <input id="title" name="title" type="text" className="inputBoxService" data-testid="post-title" placeholder="Enter your service title" value={this.state.title} onChange={this.handleInput} />
                                <br />
                                <textarea id="description" name="description" className="textBox" placeholder="Enter your service description" value={this.state.description} onChange={this.handleInput} />
                                <br />
                                <select name="category" data-testid="category" value={this.state.category} onChange={this.handleSelect} id="category">
                                    <option value="">Pick your Service</option>
                                    <option value="Music">Music</option>
                                    <option value="Photography">Photography</option>
                                    <option value="Videography">Videography</option>
                                </select>
                                <br />
                                <select name="subcategory" id="subcategory" value={this.state.subcategory} onChange={this.handleSelect}>
                                    <option value="">Select a Sub-category</option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Aerial">Aerial</option>
                                    <option value="Food">Food</option>
                                    <option value="Models">Models</option>
                                </select>
                                <br />
                                <select onChange={this.handleInput} value={this.state.country} name="country" className="countries" id="countryId">
                                    <option value="">Select your Country</option>
                                    <option value="Australia">Australia </option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Congo">Congo</option>
                                    <option value="Croatia">Croatia</option>
                                    <option value="Cyprus">Cyprus</option>
                                </select>
                                <br />
                                <select onChange={this.handleInput} value={this.state.state} name="state" className="states" id="stateId">
                                    <option value="">Select your State</option>
                                    <option value="Antioquia">Antioquia</option>
                                    <option value="Atlantico">Atlántico</option>
                                    <option value="Bogota">Bogotá, DC</option>
                                    <option value="Santander">Santander</option>
                                    <option value="Victoria">Victoria</option>
                                </select>
                                <br />
                                <select onChange={this.handleInput} value={this.state.city} name="city" className="cities" id="cityId">
                                    <option value="" >Select your City</option>
                                    <option value="Bogota">Bogotá</option>
                                    <option value="Barranquilla">Barranquilla</option>
                                    <option value="Bucaramanga">Bucaramanga</option>
                                    <option value="Cali">Cali</option>
                                    <option value="Medellin">Medellín</option>
                                    <option value="Melbourne">Melbourne</option>
                                </select>
                                <br />
                                <input id="post_image" name="post_image" data-testid="post_image" type="file" value={this.state.post_image_ooo} onChange={this.fileSelectedHandler} />
                                <label htmlFor="post_image">
                                    <span className="material-icons">cloud_upload</span>
                                    <p>Upload a Photo</p>
                                </label>
                                <br />
                                <input id="fare" name="fare" type="text" className="inputBoxService" data-testid="fare" placeholder="Enter your hourly fare" value={this.state.fare} onChange={this.handleInput} />
                                <input type="submit" className="submit-btn" data-testid="submit-btn" onSubmit={this.handleSubmit} value={this.state.postId ? "Update" : "Submit"} />
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        )

    }
} 

export default CreatePost;
