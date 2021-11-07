import React from 'react';
import './App.css';

function App() {
  const [displayMessage, setDisplayMessage] = React.useState(false);
  const [name, setName] = React.useState("");

  return (
    <div className="App">
      <label htmlFor="name">Name</label>
      <input id="name" type="text" onChange={(event) => setName(event.currentTarget.value)} />
      <button onClick={() => setDisplayMessage(true)}>Submit</button>
      {displayMessage && <p>{`Hello, ${name}!`}</p>}
    </div>
  );
}

export default App;
