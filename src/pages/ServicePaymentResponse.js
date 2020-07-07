import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import './ServicePaymentResponse.css';

function queryString(query){
    const res = {};
    query.replace(/\?/, '').split("&").forEach(q => {
        const [key, value] = q.split("=");
        res[key] = value;
    });
    return res;
}

async function updatePayment(refPago,postId) {
        const message = localStorage.getItem('message');
        localStorage.removeItem('message');
        const eventDate = localStorage.getItem('eventDate');
        localStorage.removeItem('eventDate');
        const { data } = await axios({
        method: 'POST',
        url: process.env.REACT_APP_SERVER_URL + "/posts/payment/"+postId,
        headers: { "Authorization": localStorage.getItem("token") },
        data: {
            refPago,
            message,
            eventDate
        }
      });
      return data;

}

  

class PaymentResponse extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: true,
            error: false
        } 
    } 



    
    componentDidMount(){
        const {ref_payco } = queryString(this.props.location.search);
        axios({
            method: "GET",
            url: process.env.REACT_APP_EPAYCO_CHECK_URL + ref_payco
        }).then(async(response) => {
            if (response.data.data.x_response==="Aceptada"){
                this.setState({message:"Payment Successful!"});
                const { endDate } = await updatePayment(ref_payco,this.props.match.params.id);
                //OJO Preguntar si ese async/await esta bien
                localStorage.setItem("active","true");
                this.setState({
                    endDate,
                });
            }else if (response.data.data.x_response==="Pendiente"){
                this.setState({message:"Your payment is pending."});
            }else if (response.data.data.x_response==="Rechazada"){
                this.setState({message:"Your payment has been declined."});
            }
        })
    }



    render(){
        
        return (
                <div className="payConfirmContainer">
                    <h1>{this.state.message}</h1>
                    {this.state.endDate && 
                        <p>Your membership is active until: {this.state.endDate}</p>
                    }
                    <Link to='/homeProvider'> <div className="continue-btn">Continue</div></Link>
                </div>
        )
    }
} 


export default PaymentResponse;