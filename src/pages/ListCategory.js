import React from 'react';
import axios from 'axios';
import './ListCategory.css';

class ListCategory extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: true,
            error: false,
            posts:[], 
        } 
    } 

    componentDidMount(){
        const category = this.props.location.pathname
         axios({
            url: process.env.REACT_APP_SERVER_URL + "/posts" + category,
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

        if (this.state.loading){return <h1>Loading ...</h1>};
        if (this.state.error){return <h1>Something went wrong..</h1>}  

        let posts = this.state.posts;

        return (
            <React.Fragment>
                <section>
                    <h1>We have the following artists:</h1>
                    {posts && posts.length > 0 && posts.map(post => (
                        <div className="listsContainer"  data-testid="post" key={post._id}>
                            <div className="listsImage">
                                <img src={post.post_image.indexOf("http") >=0 ? post.post_image : require(`../assets/images/${post.post_image}`)} alt="" className="listsPic" />
                            </div>
                            <div className="listsDetails">
                                <header>
                                    <h1>{post.title} </h1>
                                    <p>{post.description} </p>
                                </header>
                            </div>
                            <button type="button" data-testid="post-view" value={post._id} onClick={this.handleSubmit} className="listProfileBtn">View Post</button>
                        </div>
                    ))}
                </section>
            </React.Fragment>
        )
    }
} 


export default ListCategory;