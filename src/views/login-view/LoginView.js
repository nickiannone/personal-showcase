import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../services/useAuth';
import { Link } from 'react-router-dom';

const LoginView = (props) => {
    const navigate = useNavigate();
    const auth = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const clearInputs = () => {
        setEmail("");
        setPassword("");
        setMessage("");
    }

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        // TODO form.validateAll();

        return auth.login(email, password).then((user) => {
            navigate(`/profile/${user.profile.id}`);
        }, error => {
            setLoading(false);
            setMessage(error?.message);
        });
    };

    return (
        <div className="Login">
            <form onSubmit={handleLogin}>
                <h3>Login</h3>
                <label htmlFor="email">Email Address</label>
                <input onChange={onChangeEmail}
                        value={email}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email Address" />
                <label htmlFor="password">Password</label>
                <input onChange={onChangePassword}
                        value={password}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password" />
                <span data-testid="error">{message}</span>
                <button type="reset" onClick={clearInputs}>Reset</button>
                <button type="submit">Submit</button>
                <Link data-testid="register-link" to="/register">Register</Link>
                <Link data-testid="forgot-password-link" to="/forgot-password">Forgot password?</Link>
            </form>
        </div>
    );
}

export default LoginView;