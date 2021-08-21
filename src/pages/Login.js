import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { signin ,signinWithGoogle } from "../helpers/auth";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: null,
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({error: null});

        try {
            await signin(this.state.email, this.state.password);
        }
        catch (error) {
            this.setState({error: error.message});
        }
    }

    async googleSignIn() {
        try {
            await signinWithGoogle();
        }
        catch(error) {
            this.setState({error: error.message});
        }
    }

    render() {
        return (
            <div className="login mt-4 py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
                            <form onSubmit={this.handleSubmit}>
                   <h1>Signin to <Link to="/">Hey!</Link></h1>
                   <p>Fill the details to Login to your account</p>
                   <div className="form-group">
                       <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="email"
                            autocomlete="current-email"
                            className="form-control"
                       />
                   </div>
                   <div className="form-group mt-2">
                       <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder="password"
                            autocomlete="current-password"
                            className="form-control"
                       />
                   </div>
                   <div className="form-group mt-2">
                       {this.state.error ? <p>{this.state.error}</p> : null}
                   </div>
                   <div className="form-group mt-2 mb-2">
                       <button type="submit" className="btn btn-primary w-100">Login</button>
                   </div>
                   <p className="text-center">or</p>
                   <div className="form-group mb-2">
                       <button type ="button" onClick={this.googleSignIn} className="btn btn-danger w-100 ">
                           Signin With Google
                       </button>
                   </div>
                   <p>Don't have an account? <Link to="/signup">Signup</Link></p>
               </form>
                        </div>
                    </div>
            </div>
            </div>
        );
    }
}

export default Login;