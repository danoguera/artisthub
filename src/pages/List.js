import React from 'react';
import axios from 'axios';

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
        const subcategory = this.props.match.path;
        axios({
            url: "http://127.0.0.1:3000/posts/subcategory" + subcategory,
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
                <section>
                    <h1>We have the following artists:</h1>
                    {posts && posts.length > 0 && posts.map(post => (
                        <div class="container">
                            <div class="photographer-img">
                                <img src={post.post_image.indexOf("http") >=0 ? post.post_image : require(`../assets/images/${post.post_image}`)} alt="" class="photographer-pic" />
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


export default List;