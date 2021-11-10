import { Route, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
		<div className="App">
			<Navbar />
			<Switch>
				<Route path="/signup" component={SignupView} />
				<Route path="/login" component={LoginView} />
				<Route path="/profile" component={ProfileView} />
				<Route path="/editor" component={EditorView} />
				<Route path="/" component={LandingView} />
			</Switch>
		</div>
    );
  }

}

export default App;
