import React from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './SignUp.css';

class Contact extends React.Component{
    constructor(){
        super();
        this.state = {
            text: "",
            eventDate: new Date("July 15, 2020"),
            notEqual: false, 
            post: {fare:0}      
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
          .then(response => {
               this.setState({post: response.data, loading: false});
           })
          .catch(error => {
            this.setState({error: true} );
           })
          .finally(() => this.setState({loading: false})); 
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
            
            //this.props.history.push("/login");
            this.setState({error: true} )
           
           } )
          .finally( () => this.setState({loading: false})); 
    } 

    handlePayment = (event) => {
        event.preventDefault();
        localStorage.setItem("message",this.state.description);
        localStorage.setItem("eventDate",this.state.eventDate);
        const handler = window.ePayco.checkout.configure({
            key: process.env.REACT_APP_EPAYCO_PUBLIC,
            test: true,
          });

          handler.open({
            external: 'false',
            amount: this.state.post.fare * this.state.duration,
            tax: '0',
            tax_base: '0',
            name: 'Artisthub Service',
            description: this.state.post.title,
            currency: 'cop',
            country: 'CO',
            lang: 'en',
            invoice: '12345',
            extra1: 'extra 1',
            extra2: 'extra 2',
            extra3: 'extra 3',
            response: process.env.REACT_APP_SERVICERESPONSE_URL+'/'+this.props.match.params.id+'/',
            methodsDisable: [],
            email_billing: this.state.user.email, 
            name_billing: this.state.user.name + " " +this.state.user.lastname,
            address_billing: '',
            type_doc_billing: 'cc',
            mobilephone_billing: '',
            number_doc_billing: this.state.user.documentId,
          });
 
    }


    handleSubmit = (event) => {
        event.preventDefault();
        let url;
        if (this.state.typeOfUser==="provider"){
            url= process.env.REACT_APP_SERVER_URL+"/provider/signup";
        } else{
            url= process.env.REACT_APP_SERVER_URL+"/users/signup";
        } 
        const {text, eventDate, description} = this.state; 
        // const [value, onChange] = useState('10:00');
        axios({
            url,
            method: "POST",
            headers: {  },
            data: {
                text,
                eventDate,
                message:description
            }
            })
            .then(response => {
                this.props.history.push("/login");
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
        if (this.state.loading){return <h1>Loading...</h1>}
      
        return (
            <main>
                <section>
                    <div className="signupFrame">
                        <div className="boxSignup">
                            <h1>Please fill up this form</h1>
                            {/* <h2>Please fill up the form</h2> */}
                            <form onSubmit={this.handlePayment} >
                                <br />
                                <textarea id="description" name="description" className="textBox" placeholder="Write a message to the photographer" value={this.state.description} onChange={this.handleInput} />
                                <br />
                                <p>Event Date: <DatePicker selected={this.state.eventDate} onChange={this.handleChangeDate} showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormattttt="yyyy/MM/dd" className="date" /></p>
                                <br />
                                <input id="duration" name="duration" type="text" className="inputBoxService" placeholder="Event duration in hours" value={this.state.duration} onChange={this.handleInput} />
                                <p>Total Fare: {(this.state.post.fare && this.state.duration) ?this.state.duration * this.state.post.fare:0}</p>
                                <input type="submit" data-testid="submit-btn" className="submit-btn" value='Pay' />
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