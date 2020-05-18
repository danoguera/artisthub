import React from 'react';
import '../assets/styles/Home.css'
import photography from './Photography'

class Home extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    handleSubmit = (event) => {
        this.props.history.push("/posts/" + event.target.value)
    }

    render() {
        return (

            <React.Fragment>
                <div class="mainContainer">
                    <h1>Tell us which service you are looking for:</h1>

                    <div class="services">
                        <div onClick={ this.props.history.push("/photography")} class="service1">
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