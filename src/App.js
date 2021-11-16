import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import LoginView from './views/login-view/LoginView';
import { ProvideAuth, useAuth } from './services/useAuth';
import PrivateRoute from './routing/PrivateRoute';

const RegisterView = () => {
	return <h1>TODO Registration Page</h1>;
};

const ForgotPasswordView = () => {
	return <h1>TODO Forgot Password Page</h1>;
};


const LandingView = () => {
	return (
		<div className="landing-wrapper">
			<h1>TODO Landing Page</h1>
			<Link to="/login">Log In</Link>
		</div>
	);
};

const NotFoundView = () => {
	return <h1>404 - Not Found</h1>;
};

const ProfileView = () => {
	const { profileId } = useParams();

	return <h1>Profile View for {profileId}</h1>;
};

const EditorView = () => {
	const {profileId} = useParams();

	return <h1>Editor View for {profileId}</h1>;
};

const DashboardView = () => {
	const auth = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		console.log("Logout clicked");
		auth.logout().then(() => {
			navigate("/login");
		})
	};

	return (
		<div>
			<h1>Dashboard View</h1>
			<button onClick={handleLogout}>Log out</button>
		</div>
	);
};

function App() {
	return (
		<ProvideAuth>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LandingView />} />
					<Route path="/login" element={<LoginView />} />
					<Route element={<PrivateRoute />}>
						<Route path="/dashboard" element={<DashboardView />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ProvideAuth>
    );
}

export default App;
