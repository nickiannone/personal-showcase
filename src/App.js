import React from 'react';
import './App.css';
import DetailList from './components/detail-list/DetailList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMessage: false,
      name: "",
      details: [
		{
			type: 'workplace',
			id: 1,
			name: 'EmOpti LLC',
			start_date: '06-2021',
			end_date: '09-2021',
			location: 'Brookfield, WI',
			description: "Test",
			skills: [
				'Spring Boot',
				'Angular',
				'Testing',
				'Healthcare'
			]
		},
		{
			type: 'workplace',
			id: 2,
			name: 'Northwestern Mutual',
			start_date: '04-2019',
			end_date: '06-2021',
			location: 'Milwaukee, WI',
			description: 'Test',
			skills: [
				'Spring Boot',
				'Java',
				'Angular',
				'Terraform',
				'AWS'
			]
		}
	  ]
    };
  }

  setName(name) {
    this.setState((currentState) => {
      return Object.assign(currentState, {
        name: name
      });
    });
  }

  setDisplayMessage(displayMessage) {
    this.setState((currentState) => {
      return Object.assign(currentState, {
        displayMessage: displayMessage
      });
    });
  }

  setDetails(details) {
    this.setState((currentState) => {
      return Object.assign(currentState, {
        details: details
      });
    });
  }

  render() {
    return (
    	<div className="App">
			<h1>Personal Showcase</h1>
			<label htmlFor="name">Name</label>
			<input id="name" type="text" onChange={(event) => this.setName(event.currentTarget.value)} />
			<button onClick={() => this.setDisplayMessage(true)}>Submit</button>
			{this.state.displayMessage && <p>{`Hello, ${this.state.name}!`}</p>}
			<DetailList details={this.state.details} />
      	</div>
    );
  }

}

export default App;
