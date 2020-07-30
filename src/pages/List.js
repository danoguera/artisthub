import React from 'react';
import axios from 'axios';
import './List.css';

class List extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: true,
            error: false,
            posts:[], 
        } 
    } 

    componentDidMount(){
        const subcategory = this.props.match.params.subcategory;
        const category=this.props.match.params.category;
        axios({
            url: process.env.REACT_APP_SERVER_URL + "/posts/" + category + "/" + subcategory,
            method: "GET",
            headers: { "Authorization": localStorage.getItem("token") } 

        })
          .then(response =>{
               this.setState({ posts: response.data})
           } )
          .catch(error =>{
            localStorage.removeItem("token");
            this.props.history.push("/login");
            this.setState({error: true} )
           
           } )
          .finally( () => this.setState({loading: false})); 
    }


    handleSubmit = (event) => {
        this.props.history.push("/posts/"+event.target.value)
    } 

    render(){

        if (this.state.loading){return <h1>Loading...</h1>};
        if (this.state.error){return <h1>Something went wrong..</h1>}  

        let posts = this.state.posts;

        return (
            <React.Fragment>
                <section className="showSection">
                    <h2>We have the following artists:</h2>
                    {posts && posts.length > 0 && posts.map(post => (
                        <div className="showContainer" data-testid="post" key={post._id}>
                            <div className="showImage">
                                <img src={post.post_image.indexOf("http") >=0 ? post.post_image : require(`../assets/images/${post.post_image}`)} alt="" className="showPic" />
                            </div>
                            <div className="showDetails">
                                    <h1>{post.title} </h1>
                                    <p>{post.description} </p>
                            </div>
                            <button type="button" value={post._id} data-testid="post-view" onClick={this.handleSubmit} className="showProfileBtn">View Post</button>
                        </div>
                    ))}
                </section>
            </React.Fragment>
        )
    }
} 


export default List;