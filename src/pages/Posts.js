import React from 'react';
import axios from 'axios';

class Posts extends React.Component{
    constructor(){
        super();
        this.state = {

        } 
    } 

    componentDidMount(){
        console.log("Didmount de Posts.js");
        const postId = this.props.match.params.id;

        axios({
            url: process.env.REACT_APP_SERVER_URL + "/posts/" + postId,
            method: "GET",
            headers: { "Authorization": localStorage.getItem("token") } 

        })
          .then(response =>{
              console.log(response.data);
               this.setState( response.data)
           } )
          .catch(error =>{
            
            //this.props.history.push("/login");
            this.setState({error: true} )
           
           } )
          .finally( () => this.setState({loading: false})); 
    }



    render(){

        return (
            <section>
             <h1>{this.state.title} </h1>
             <h2>{this.state.description} </h2>
             <p>City:{this.state.city} </p>
             <p>State:{this.state.state} </p>
             <p>Country:{this.state.country} </p>
            </section>
            
        )
    }
} 


export default Posts;