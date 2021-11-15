import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authService } from '../services/authService';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            props => {
                if (!authService.currentUserValue) {
                    return <Redirect to={{ pathname: '/login', state: { from: props.location }}} />;
                }
                return <Component {...props} />;
            }
        } />
    );
};

export default PrivateRoute;