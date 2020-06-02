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
        if (event.target.value==="photography"){
            this.setState({
                subcategoryList:["aerial","model","food","wedding"]  
            })
         } 
    } 

    handleSubmit = async(event) => {
        event.preventDefault();
        //let post_image= await this.fileUpload(); 
        //post_image="http://127.0.0.1:3002/uploads/images/"+post_image;
        let method, url;
        if (this.state.postId){
            method= "PUT";
            url=process.env.REACT_APP_SERVER_URL+"/posts/"+this.state.postId;
        } else{
            method= "POST";
            url= process.env.REACT_APP_SERVER_URL+"/posts/";
        }
        //console.log("El valor de post image", post_image);
        //if (post_image===""){
        //    post_image= "https://mltmpgeox6sf.i.optimole.com/M9I38xY-EO2wV8tf/w:auto/h:auto/q:auto/https://redbanksmilesnj.com/wp-content/uploads/2015/11/man-avatar-placeholder.png"
        //} 
        const fd = new FormData();
        fd.append('photo',this.state.selectedFile,"photo");
        
        const {title, description, city, state, country, subcategory, category} = this.state; 
        fd.set("title", title);
        fd.set("description", description);
        fd.set("city", city);
        fd.set("state", state);
        fd.set("country", country);
        fd.set("subcategory", subcategory);
        fd.set("category", category);

        axios({
            url,
            method,
            headers: { "Authorization": localStorage.getItem("token") },
            data: fd,
            })
            .then(response => {
                this.props.history.push("/posts/"+response.data._id);  
            })
            .catch(error =>{
                console.log(error.response.data);
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
    
    
  fileUpload = async() => {
      try {
        const fd = new FormData();
        fd.append('photo',this.state.selectedFile,"photo");
        let res = await axios.post("http://127.0.0.1:3002/upload", fd)
        this.setState({post_image: res.data.filename},()=>console.log("Ya setee el post_image:", this.state.post_image))
        console.log("La respuesta de res", res)
        return res.data.filename;          
      } catch (error) {
          return "algun error";
      }

        // axios.post("http://127.0.0.1:3002/upload", fd)
        // .then(response => {
        // this.setState({ post_image: response.data.filename });
        // console.log("Ya se guardo la foto", response.data.filename)
        // return response.data.filename;
        // })
        // .catch(error => {
        // console.log("Ha ocurrido un error");;
        // return "";
        // });
    
  }


    render(){
        if (this.state.loading){return <h1>Loading...</h1>}
      

        return (
            <main>
                <section>
                    <div class="service">
                        <div class="boxService">
                            <h1>Create your service</h1>
                            <h2>Please fill up the form</h2>
                            <form onSubmit={this.handleSubmit} >
                                <input id="title" name="title" type="text" className="inputBoxService" placeholder="Enter your service title" value={this.state.title} onChange={this.handleInput} />
                                <br />
                                <textarea id="description" name="description" className="textBox" placeholder="Enter your service description" value={this.state.description} onChange={this.handleInput} />
                                <br />
                                <select name="category" value={this.state.category} onChange={this.handleSelect} id="category">
                                    <option value="">Pick your Service:</option>
                                    <option value="music">Music</option>
                                    <option value="photography">Photography</option>
                                    <option value="videography">Videography</option>
                                </select>
                                <br />
                                <select name="subcategory" id="subcategory" value={this.state.subcategory} onChange={this.handleSelect}>
                                    <option value="">Select a Subcategory</option>
                                    <option value="wedding">Wedding</option>
                                    <option value="aerial">Aerial</option>
                                    <option value="food">Food</option>
                                    <option value="models">Models</option>
                                </select>
                                <br />
                                <select onChange={this.handleInput} value={this.state.country} name="country" class="countries" id="countryId">
                                    <option value="">Select your country:</option>
                                    <option value="Australia">Australia </option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Congo">Congo</option>
                                    <option value="Croatia">Croatia</option>
                                    <option value="Cyprus">Cyprus</option>
                                </select>
                                <br />
                                <select onChange={this.handleInput} value={this.state.state} name="state" class="states" id="stateId">
                                    <option value="">Select your state:</option>
                                    <option value="Victoria">Victoria</option>
                                    <option value="Atlantico">Atlantico</option>
                                    <option value="Bogota">Bogota</option>
                                    <option value="Antioquia">Antioquia</option>
                                    <option value="Santander">Santander</option>
                                </select>
                                <br />
                                <select onChange={this.handleInput} value={this.state.city} name="city" class="cities" id="cityId">
                                    <option value="" >Select your city:</option>
                                    <option value="Bogota">Bogota</option>
                                    <option value="Barranquilla">Curramba</option>
                                    <option value="Melbourne">Melbourne</option>
                                    <option value="Ciudad1">Ciudad1</option>
                                    <option value="Ciudad2">Ciudad2</option>
                                    <option value="Ciudad3">Ciudad3</option>
                                </select>
                                <br />
                                <input id="post_image" name="post_image" type="file" value={this.state.post_image_ooo} onChange={this.fileSelectedHandler} />
                                <label for="post_image">
                                    <span class="material-icons">cloud_upload</span>
                                    <p>Upload a Photo</p>
                                </label>
                                <br />
                                <input type="submit" class="submit-btn" onSubmit={this.handleSubmit} className="submit-btn" value={this.state.postId ? "Update" : "Submit"} />
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        )

    }
} 

export default CreatePost;
