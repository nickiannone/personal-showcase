import React from 'react';

class LoginView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    clearInputs() {
        this.setState({
            email: "",
            password: ""
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        // TODO this.form.validateAll();

        this.login(this.state.email, this.state.password).then(() => {
            this.props.history.push("/profile");
            window.location.reload();
        }, error => {
            this.setState({
                loading: false,
                message: error?.response?.data?.message
            });
        });
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleLogin}>
                    <h3>Login</h3>
                    <label for="email">Email Address</label>
                    <input onChange={this.onChangeEmail}
                            id="email"
                            value={this.state.email}
                            name="email"
                            type="email"
                            placeholder="Email Address" />
                    <label for="password">Password</label>
                    <input onChange={this.onChangePassword}
                            value={this.state.password}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password" />
                    <button type="reset" onClick={this.clearInputs}>Reset</button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default LoginView;