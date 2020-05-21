import React from 'react';
import '../assets/styles/Home.css'


class Home extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    handlePhoto = (event) => {

        this.props.history.push("/photographers");
    }

    render() {
        return (

            <React.Fragment>
                <div class="mainContainer">
                    <h1>Tell us which service you are looking for:</h1>

                    <div class="services">
                        <div  onClick={ this.handlePhoto } class="service1">
                            <h3>Photo</h3>
                        </div>
                        <div class="service2">
                            <h3>Video</h3>
                        </div>
                        <div class="service3">
                            <h3>Music</h3>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Home;