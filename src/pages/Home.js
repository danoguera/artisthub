import React from 'react';
import '../assets/styles/Home.css'
import {Link} from 'react-router-dom';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    // Esto ya se puede borrar?
    // handleCategory = (event) => {
    //     if (String(event.target).indexOf("Video")>0){
    //         this.props.history.push("/category/music");   
    //     }
    //     if (String(event.target).indexOf("Video")>0){
    //         this.props.history.push("/category/videography");   
    //     }
  
    // } 

    handlePhoto = (event) => {
        this.props.history.push("/photographers");
    }

    render() {
        return (

            <React.Fragment>
                <div className="mainContainer">
                    <h1>Tell us which service you are looking for:</h1>

                    <div className="services">
                        <div  onClick={ this.handlePhoto } data-testid="photography-view" className="service1">
                            <h3>Photo</h3>
                        </div>
                        <div  className="service2">
                            <h3><Link to="/category/Videography" className="text-link" >Video</Link></h3>
                        </div>      
                        <div className="service3">
                            <h3><Link to="/category/Music" className="text-link" >Music</Link></h3>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Home;