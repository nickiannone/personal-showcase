import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import LoginView from './views/login-view/LoginView';
import PrivateRoute from './routing/PrivateRoute';

const RegisterView = () => {
	return <h1>TODO Registration Page</h1>;
};

const ForgotPasswordView = () => {
	return <h1>TODO Forgot Password Page</h1>;
};


const LandingView = () => {
	return <h1>TODO Landing Page</h1>;
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

	return <h1>Editor View for {profileId}</h1>
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
		<BrowserRouter>
			<Routes>
				<Route path="/" component={<LandingView />} />
				<Route path="/login" component={<LoginView />} />
				<Route path="/register" component={<RegisterView />} />
				<Route path="/forgot-password" component={<ForgotPasswordView />} />
				<PrivateRoute path="/profile/:profileId" component={<ProfileView />}>
					<PrivateRoute path="edit" component={<EditorView />} />
				</PrivateRoute>
				<Route path="*" element={<NotFoundView />} />
			</Routes>
		</BrowserRouter>
    );
  }

}

export default App;
