import React from 'react';
import { postPhotoTypes } from '../components/fakeData';

class Photographers extends React.Component{
    constructor(){
        super();
        this.state = {

        } 
    } 

    handleSubmit = (event) => {
        this.props.history.push("/"+event.target.value)
    } 

    render(){
        let posts = postPhotoTypes;
        return (
            <React.Fragment>
                <section>
                    <h1>Choose the type of photography you'd like:</h1>
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
                            <button type="button" value={post.route} onClick={this.handleSubmit}  class="profile-btn">View Photographers</button> 
                        </div>
                    ))} 
                </section>
            </React.Fragment>
        )
    }
} 


export default Photographers;