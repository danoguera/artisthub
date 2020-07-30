import React from 'react';
import axios from 'axios';
import './ListProvider.css';
class ListProviderPosts extends React.Component{
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
            url: process.env.REACT_APP_SERVER_URL + "/posts/",
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
        if (posts.length===0){return <section><h1>You have no posts yet</h1></section>};

        return (
            <React.Fragment>
                <section className="listProvider"> 
                <h1>You have the following posts:</h1>                    
                    {posts && posts.length > 0 && posts.map(post => (
                        <div className="listContainer" data-testid="provider-post" key={post._id}>
                            <div className="listImage">
                                <img src={post.post_image.indexOf("http") >= 0 ? post.post_image : require(`../assets/images/${post.post_image}`)} alt="" className="listPic" />
                            </div>
                            <div className="listDetails">
                                    <h1>{post.title} </h1>
                                    <p>{post.description} </p>
                            </div>
                            <button type="button" data-testid="post-view" value={post._id} onClick={this.handleSubmit} className="btnProfile">View Post</button>
                        </div>
                    ))}
                </section>
            </React.Fragment>
        )
    }
} 


export default ListProviderPosts;