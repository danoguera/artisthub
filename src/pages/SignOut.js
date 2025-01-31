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
        localStorage.removeItem("typeOfUser");
        localStorage.removeItem("active");
        this.props.onUpdate("");
        setTimeout(() => this.props.history.push('/'),  500);
    } 

    render(){
        if (this.state.loading){return <h1>Loading...</h1>}
      

        return (
            <main>
            <div className="login"><h1>Thanks for your visit!</h1>
            </div>
            </main>
        )

    }
} 

export default SignOut;
