import React from 'react';
import axios from 'axios';

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
        if (this.state.loading) return (<h1>Loading...</h1>); 
        if (this.state.error || !this.state.post) return (<h1>No se puede desplegar informacion de este post</h1>); 
        
        return (
             
            <section>
  
               {typeOfUser==="provider"?<button onClick={this.deletePost} >Borrar Post</button>:""} 
               {typeOfUser==="provider"?<button onClick={this.updatePost} >Editar Post</button>:""} 
             <h1>{this.state.post.title} </h1>
             <h2>{this.state.post.description} </h2>
             <p>City:{this.state.post.city} </p>
             <p>State:{this.state.post.state} </p>
             <p>Country:{this.state.post.country} </p>
            </section>
            
        )
    }
} 


export default Posts;