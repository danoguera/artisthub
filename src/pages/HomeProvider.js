import React from 'react';
import {Link} from 'react-router-dom';
import './HomeProvider.css'


class HomeProvider extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (

            <React.Fragment>
                <div className="mainProvContainer">
                    <h1>Tell us which service you want to offer:</h1>

                    <div className="provServices">
                        <div className="provService1">
                            <h3><Link to="/posts/create" className="text-link" >Create Service</Link></h3>
                        </div>
                        <div className="provService2">
                            <h3><Link to="/list" className="text-link">List Services</Link></h3>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HomeProvider;