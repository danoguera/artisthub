import React from 'react';
import { postsAerial }  from '../components/fakeData';

class Aerial extends React.Component{
    constructor(){
        super();
        this.state = {

        } 
    } 

    handleSubmit = (event) => {
        this.props.history.push("/posts/"+event.target.value)
    } 

    render(){
        let posts = postsAerial;
        return (
            <React.Fragment>
                <section>
                    <h1>Our best artists in aerial photography:</h1>
                    {posts && posts.length > 0 && posts.map(post => (
                        <div class="container">
                            <div class="photographer-img">
                                <img src={post.post_image} alt="" class="photographer-pic" />
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

export default Aerial;