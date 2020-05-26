import React from 'react';


class SignOut extends React.Component{
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            result: "",
        } 
    } 

    componentDidMount(){
        localStorage.removeItem("token");
        this.props.onUpdate("");
    } 

    render(){
        if (this.state.loading){return <h1>Loading...</h1>}
      

        return (
            <main>
            <div className="login"><h1>Gracias por tu visita.</h1>
            </div>
            </main>
        )

    }
} 

export default SignOut;
