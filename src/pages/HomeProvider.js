import React from 'react';
import '../assets/styles/Home.css'


class HomeProvider extends React.Component {
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
                <div className="mainContainer">
                    <h1>Tell us which service you want to offer:</h1>

                    <div className="services">
                        <div  onClick={ this.handlePhoto } className="service1">
                            <h3>Photo</h3>
                        </div>
                        <div className="service2">
                            <h3>Video</h3>
                        </div>
                        <div className="service3">
                            <h3>Music</h3>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HomeProvider;