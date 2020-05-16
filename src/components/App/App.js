import React, {Component} from 'react';
import './App.css';
import Areas from '../Areas/Areas.js';
import Login from '../Login/Login.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      username: '',
      purpose: '',
      areas: []
    }
  }

  loggingIn = (username, purpose) => {
    this.setState({isLoggedIn: !this.state.isLoggedIn, username, purpose})
    // console.log(this.state.isLoggedIn)
  }

  componentDidMount = () => {
    fetch("https://vrad-api.herokuapp.com/api/v1/areas")
      .then(response => response.json())
      .then(areaDetails => {
        const areaNamePromises = areaDetails.areas.map(area => {
          return fetch(`https://vrad-api.herokuapp.com${area.details}`)
            .then(response => response.json())
            .then(info => {
              return {...info, shortName:area.area}
            })
        })
        Promise.all(areaNamePromises)
        .then(areaData => this.setState({areas: areaData}))
      })
        .catch(err => console.error(err))
  }


  render () {

    if(this.state.isLoggedIn === true){
      return (

        <main className="App">
          <header className="areas-page-header"><h1>Vacation Rentals Around Denver</h1><button className='sign-out-btn' type='button'>Sign out!</button> </header>
          <Areas data={this.state.areas} purpose={this.state.purpose} username={this.state.username}/>
          {console.log('apps', this.state.areas)}
        </main>
      );

    } else {
      return (
        <main className='App'>
          <header className="login-page-header"><h1 className="header-text">Vacation Rentals Around Denver</h1></header>
          <Login loggingIn={this.loggingIn} />
        </main>
      )
    }
  }
}

export default App;
