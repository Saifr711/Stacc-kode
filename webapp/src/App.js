import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = React.useState(null);

  function searchPerson(name){
    let url = "http://localhost:3001/api/pep?name=" + name;
    fetch(url)
    .then((res) => res.json())
    .then((data) => setData(data));
  }

  var userInput = React.createRef();

  function handleClick(){
    searchPerson(userInput.current.value);
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1>Search for politically exposed people</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <div>
        <input ref={userInput}></input>
        <button onClick={handleClick}>Search</button>
        </div>
        <div>
        <p>{!data ? "": "Number of results: " + data.numberOfHits}</p>
        <p>{!data ? "": !data.numberOfHits ? "No match found" : data.results[0].name + " is a politically exposed person"}</p>
        </div>
      </header>
    </div>
  );
}


export default App;
