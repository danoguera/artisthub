import React from 'react';
import {Link} from 'react-router-dom';
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
                        <div className="service1">
                        <h3><Link style={{ textDecoration: 'none' }} to="/posts/create">Crear post</Link></h3>
                        </div>
                        <div className="service2">
                            <h3><Link style={{ textDecoration: 'none' }} to="/list">Listar...</Link></h3>
                        </div>
                        <div className="service3">
                            <h3>Who knows...</h3>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HomeProvider;