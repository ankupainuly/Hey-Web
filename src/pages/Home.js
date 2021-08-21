import React, { Component } from 'react';
import { Link } from "react-router-dom"

class Home extends Component {
    render() {
        return (
            <div className='home mt-4 py-4 text-center'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
                            <h1>Welcome to Hey!</h1>
                            <Link to="/login" className="btn btn-primary">login</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;