import React from 'react';
import axios from 'axios';
import './Posts.css';

class Posts extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: true,
            error: false
        } 
    } 

    componentDidMount(){
        this.getPost();
    }

    getPost = () =>{

        const postId = this.props.match.params.id;

        axios({
            url: process.env.REACT_APP_SERVER_URL + "/posts/" + postId,
            method: "GET",
            headers: { "Authorization": localStorage.getItem("token") } 

        })
          .then(response =>{
               this.setState({post: response.data, loading: false});
           } )
          .catch(error =>{
            
            //this.props.history.push("/login");
            this.setState({error: true} )
           
           } )
          .finally( () => this.setState({loading: false})); 
    } 

    goBack = () => {
        this.props.history.goBack();
    }

    updatePost = () => {
        const postId = this.props.match.params.id;
        this.props.history.push("/posts/create/"+postId);
    } 

    deletePost = () => {
        const postId = this.props.match.params.id;

        axios({
            url: process.env.REACT_APP_SERVER_URL + "/posts/" + postId,
            method: "DELETE",
            headers: { "Authorization": localStorage.getItem("token") } 

        })
          .then(response =>{
              alert("El post ha sido borrado")
               //this.setState( response.data)
               this.props.history.push("/homeProvider");
           } )
          .catch(error =>{
            alert("No se pudo borrar el post")
            //this.props.history.push("/login");
            //this.setState({error: true} )
           
           } )
          .finally( () => this.setState({loading: false})); 
    }


    render(){
        const typeOfUser=localStorage.getItem("typeOfUser");
        if (this.state.loading) return (<div className="postContainer"><h1>Loading...</h1></div>); 
        if (this.state.error || !this.state.post) return (<h1>No se puede desplegar informacion de este post</h1>); 
        
        return (
                <div className="postContainer">
                    <h1>Your Service</h1>
                    <div className="post-img">
                        <img src={this.state.post.post_image} alt="" className="post-pic" />
                    </div>
                    <div className="post-details" data-testid="post">
                        <h1>{this.state.post.title}</h1>
                        <p>{this.state.post.description}</p>
                        <div className="postrow">
                            <ul>
                                <li><strong>Category:</strong> {this.state.post.category}</li>
                                <li><strong>Subcategory:</strong> {this.state.post.subcategory}</li>
                            </ul>
                            <ul>
                                <li><strong>Country:</strong> {this.state.post.country}</li>
                                <li><strong>State:</strong> {this.state.post.state}</li>
                                <li><strong>City:</strong> {this.state.post.city}</li>
                            </ul>
                        </div>
  
                        <div className="postButtons">
                            {typeOfUser==="provider"?<button className="post-btn" data-testid="post-delete" onClick={this.deletePost} >Delete</button>:""} 
                            {typeOfUser==="provider"?<button className="post-btn" data-testid="post-edit" onClick={this.updatePost}  >Edit </button>:""} 
                            <button className="post-btn" onClick={this.goBack} >Hire Me!</button>
                            <button className="post-btn" onClick={this.goBack} >Back </button>
                        </div>
                    </div>
                </div>
        )
    }
} 


export default Posts;