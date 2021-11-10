import React from 'react';
import axios from 'axios';

const AppContext = React.createContext();

export class AppContextProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {},
            token: ""
        };
    }

    async signup(username, email, password) {
        const response = await axios.post("/auth/local/register", {
            username: username,
            email: email,
            password: password
        });
        this.setState({
            user: response.data.user,
            token: response.data.jwt
        });
        return response;
    }

    async login(email, password) {
        const response = await axios.post("/auth/local", {
            identifier: email,
            password: password
        });
        this.setState({
            user: response.data.user,
            token: response.data.jwt
        });
        return response;
    }

    

    render() {
        return (
            <AppContext.Provider
                value={{
                    // TODO add other API methods!
                    signup: this.signup,
                    login: this.login,
                    ...this.state
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export const withContext = Component => {
    return props => {
        return (
            <AppContext.Consumer>
                {
                    globalState => {
                        return (
                            <Component
                                {...globalState}
                                {...props}
                            />
                        );
                    }
                }
            </AppContext.Consumer>
        )
    }
};