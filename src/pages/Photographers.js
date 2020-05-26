import React from 'react';
import { postPhotoTypes } from '../components/Data';

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
                        <div key={post.id} className="container">
                            <div className="photographer-img">
                                <img src={post.post_image} alt="" className="photographer-pic" />
                            </div>
                            <div className="photographer-details">
                                <header>
                                    <h1>{post.title} </h1>
                                    <p>{post.description} </p>
                                </header>
                            </div>
                            <button type="button" value={post.route} onClick={this.handleSubmit}  className="profile-btn">View Photographers</button> 
                        </div>
                    ))} 
                </section>
            </React.Fragment>
        )
    }
} 


export default Photographers;