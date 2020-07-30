import React from 'react';
import axios from 'axios';
import './Contact.css';
import './PaymentResponse.css';

class Contact extends React.Component{
    constructor(){
        super();
        this.state = {
            text: "",
            eventDate: new Date("January 15, 2020"),
            notEqual: false,       
        } 
    } 

    componentDidMount(){
        this.getPost();
        this.getUser();
    }

    getPost = () =>{

        const postId = this.props.match.params.id;

        axios({
            url: process.env.REACT_APP_SERVER_URL + "/posts/" + postId,
            method: "GET",
            headers: { "Authorization": localStorage.getItem("token") } 

        })
          .then(response =>{
               this.setState({post: response.data, loading: false});
           } )
          .catch(error =>{
            
            //this.props.history.push("/login");
            this.setState({error: true} )
           
           } )
          .finally( () => this.setState({loading: false})); 
    } 

    getUser = () =>{

        axios({
            url: process.env.REACT_APP_SERVER_URL + "/users/get",
            method: "GET",
            headers: { "Authorization": localStorage.getItem("token") } 

        })
          .then(response =>{
               this.setState({user: response.data, loading: false});
           } )
          .catch(error =>{
            this.setState({error: true} )
           
           } )
          .finally( () => this.setState({loading: false})); 
    } 

    handleSubmit = (event) => {
        event.preventDefault();
        const postId = this.props.match.params.id;
        let url = process.env.REACT_APP_SERVER_URL+"/posts/contact";
        const {description} = this.state; 
        axios({
            url,
            method: "POST",
            headers: { "Authorization": localStorage.getItem("token") },
            data: {
                description,
                postId
            }
            })
            .then(response => {
                this.setState({ sent: true });
            })
            .catch(error =>{  
                this.setState({ 
                    error: error.response.data.message,
                })
             })
            .finally(() => this.setState({ loading: false })); 
    } 

    handleInput = (event) => {
        this.setState({
           [event.target.name]: event.target.value, 
        }) 
    } 

    handleChangeDate = date => {
        this.setState({
          eventDate: date
        });
      };

    render(){
        if (this.state.loading){return <div className="textBox"><h1>Loading...</h1></div>}
        if (this.state.sent){setTimeout(() => this.props.history.push('/home'),  1200);
        return <div className="payConfirmContainer"><h1>Message Sent!</h1></div>}
        
        return (
            <main>
                <section>
                    <div className="contactFrame">
                        <div className="contactSignup">
                            <h1>Please fill up this form</h1>
                            <form onSubmit={this.handleSubmit} >
                                <br />
                                <textarea id="description" name="description" className="textBox" placeholder="Write a message to the photographer" value={this.state.description} onChange={this.handleInput} />
                                <input type="submit" data-testid="submit-btn" className="contactSubmitBtn" value='Send' />
                                <br/>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        )

    }
} 

export default Contact;