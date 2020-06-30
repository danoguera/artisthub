import React from 'react';
import axios from 'axios';


class Payment extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: true,
            error: false
        } 
    } 

    componentDidMount(){
        this.getProviderInfo();
    }

    getProviderInfo = () =>{

        axios({
            url: process.env.REACT_APP_SERVER_URL + "/provider/get",
            method: "GET",
            headers: { "Authorization": localStorage.getItem("token") } 

        })
          .then(response =>{
              console.log(response)
               this.setState({providerData: response.data, loading: false});
           })
          .catch(error =>{
            console.log(error);
            this.setState({error: true} )
           })
          .finally( () => this.setState({loading: false})); 
    } 


    handlePayment = () => {
        const handler = window.ePayco.checkout.configure({
            key: process.env.REACT_APP_EPAYCO_PUBLIC,
            test: true,
          });

          handler.open({
            external: 'true',
            amount: '50000',
            tax: '0',
            tax_base: '0',
            name: 'Suscripcion Artisthub',
            description: 'Pago mensualidad Artisthub',
            currency: 'cop',
            country: 'CO',
            lang: 'en',
            invoice: '12345',
            extra1: 'extra 1',
            extra2: 'extra 2',
            extra3: 'extra 3',
            response: process.env.REACT_APP_RESPONSE_URL,
            methodsDisable: [],
            email_billing: this.state.providerData.email, 
            name_billing: this.state.providerData.name + " " +this.state.providerData.lastname,
            address_billing: '',
            type_doc_billing: 'cc',
            mobilephone_billing: '',
            number_doc_billing: this.state.providerData.documentId,
          });
 
    }


    render(){
        
        return (
                <div className="postContainer">
                    <button className="post-btn" onClick={this.handlePayment} > Pay  </button>
                </div>
        )
    }
} 


export default Payment;