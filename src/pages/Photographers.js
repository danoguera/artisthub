import React from 'react';
import { postPhotoTypes } from '../components/Data';
import './Photographers.css';

class Photographers extends React.Component{
    constructor(){
        super();
        this.state = {

        } 
    } 

    handleSubmit = (event) => {
        this.props.history.push("/catsub/Photography/"+event.target.value)
    } 

    render(){
        let posts = postPhotoTypes;
        return (
            <React.Fragment>
                <section className="photographerSection">
                    <h2>Choose the type of photography you'd like:</h2>
                    {posts && posts.length > 0 && posts.map(post => (
                        <div key={post.id} className="photoContainer" data-testid="photo-category">
                            <div className="photographerImg">
                                <img src={post.post_image} alt="" className="photographerPic" />
                            </div>
                            <div className="photographerDetails" >
                                <header className="photographerHeader">
                                    <h1>{post.title} </h1>
                                    <p>{post.description} </p>
                                </header>
                            </div>
                            <button type="button" value={post.route} data-testid="view-category" onClick={this.handleSubmit}  className="profileButton">View Photographers</button> 
                        </div>
                    ))} 
                </section>
            </React.Fragment>
        )
    }
} 


export default Photographers;