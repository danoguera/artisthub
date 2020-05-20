import React from 'react';
import axios from 'axios';
import { postsFood } from '../components/fakeData'; 

class Food extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: true,
            error: false,
            posts:[], 
        } 
    } 

    componentDidMount(){
        axios({
            url: "http://127.0.0.1:3000/posts/subcategory/food",
            method: "GET",

        })
          .then(response =>{
               this.setState({ posts: response.data})
                console.log(response.data); 
           } )
          .catch(error => this.setState({error: error} ))
          .finally( () => this.setState({loading: false})); 
    }


    handleSubmit = (event) => {
        this.props.history.push("/posts/"+event.target.value)
    } 

    render(){
        if (this.state.loading){return <h1>Loading...</h1>};

        let posts = this.state.posts;
        return (

            <React.Fragment>
                <section>
                    <h1>Some of our dishes:</h1>
                    {posts && posts.length > 0 && posts.map(post => (
                        <div class="container">
                            <div class="photographer-img">
                                <img src={require(`../assets/images/${post.post_image}`)} alt="" class="photographer-pic" />
                            </div>
                            <div class="photographer-details">
                                <header>
                                    <h1>{post.title} </h1>
                                    <p>{post.description} </p>
                                </header>
                            </div>
                            <button type="button" value={post.id}  onClick={this.handleSubmit} class="profile-btn">View Post</button>
                        </div>
                    ))}
                </section>
            </React.Fragment>
        )
    }
} 

export default Food;