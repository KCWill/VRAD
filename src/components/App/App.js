import React, {Component} from 'react';
import './App.css';
import Login from '../Login/Login.js'

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render () {
    return (
      <main className="App">
        <header>Vacation Rentals Around Denver</header>
        <Login />
      </main>
    );
  }
}

export default App;
