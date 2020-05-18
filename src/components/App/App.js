import React, {Component} from 'react';
import './App.css';
import Areas from '../Areas/Areas.js';
import Login from '../Login/Login.js';
import { Route, Redirect } from 'react-router-dom';

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
    this.setState({...this.state, isLoggedIn: true, username, purpose})
  }

  signOut = () => {
    this.setState({...this.state, isLoggedIn: false});
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
    
      return (
        <div>
        <header>
          <h1>
            Vacation Rentals Around Denver
          </h1>
        </header>
        <main className='App'>
          <Route 
            exact path='/'
            render={() => (
              <section>
                <Login 
                  loggingIn={this.loggingIn}
                />
              </section>
            )}
          />
          <Route
            exact 
            path='/areas'
            render={() => (
              <section>
                <header>
                    <button className='sign-out-btn' type='button' onClick={this.signOut}>
                      Sign out!
                    </button>
                    {!this.state.isLoggedIn && <Redirect to='/' />}
                </header>
                <Areas 
                  data={this.state.areas} 
                  purpose={this.state.purpose} 
                  username={this.state.username}
                />
              </section>
            )}
          />
          
        </main>
        </div>
      );
    }
}

export default App;
