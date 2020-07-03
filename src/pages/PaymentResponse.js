import React from 'react';
import axios from 'axios';

function queryString(query){
    const res = {};
    query.replace(/\?/, '').split("&").forEach(q => {
        const [key, value] = q.split("=");
        res[key] = value;
    });
    return res;
}

async function updateSubscriptionDate(refPago) {
        const { data } = await axios({
        method: 'PUT',
        url: process.env.REACT_APP_SERVER_URL + "/provider/endDate",
        headers: { "Authorization": localStorage.getItem("token") },
        data: {
            refPago,
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
            console.log(response.data);
            if (response.data.data.x_response==="Aceptada"){
                this.setState({message:"El pago fue exitoso"});
                const { endDate } = await updateSubscriptionDate(ref_payco);
                //OJO Preguntar si ese async/await esta bien
                localStorage.setItem("active","true");
                this.setState({
                    endDate,
                });
            }else if (response.data.data.x_response==="Pendiente"){
                this.setState({message:"El pago está pendiente"});
            }else if (response.data.data.x_response==="Rechazada"){
                this.setState({message:"El pago ha sido rechazado"});
            }
        })
    }



    render(){
        
        return (
                <div className="postContainer">
                    <h1>{this.state.message}</h1>
                    {this.state.endDate && 
                        <p>Activo hasta: {this.state.endDate}</p>
                    }
                </div>
        )
    }
} 


export default PaymentResponse;