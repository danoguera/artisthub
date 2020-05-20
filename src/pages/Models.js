import React from 'react';
import { postsModels } from '../components/fakeData'; 

class Models extends React.Component{
    constructor(){
        super();
        this.state = {

        } 
    } 

    handleSubmit = (event) => {
        this.props.history.push("/posts/"+event.target.value)
    } 

    render(){
        let posts = postsModels; 
        return (
            <React.Fragment>
                <section>
                    <h1>We have the following artists:</h1>
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
                            <button type="button" value={post.id} onClick={this.handleSubmit} class="profile-btn">View Post</button>
                        </div>
                    ))}
                </section>
            </React.Fragment>
        )
    }
} 


export default Models;