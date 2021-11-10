import React from 'react';
import { withContext } from "../../AppContext";

class LoginView extends React.Component {
    
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.login(this.state.email, this.state.password)
            .then(() => this.props.history.push("/profile"));
    }

    handleChange(event) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    clearInputs() {
        this.setState({
            email: "",
            password: ""
        });
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <h3>Login</h3>
                    <input onChange={this.handleChange}
                           value={this.state.email}
                           name="email"
                           type="text"
                           placeholder="Email Address" />
                    <input onChange={this.handleChange}
                           value={this.state.password}
                           name="password"
                           type="password"
                           placeholder="Password" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default withContext(LoginView);