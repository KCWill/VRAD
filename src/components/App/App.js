import React, {Component} from 'react';
import './App.css';
import Areas from '../Areas/Areas.js';
import Login from '../Login/Login.js';
import Listings from '../Listings/Listings.js';
import ListingDetails from '../ListingDetails/ListingDetails.js';
import { Route, Redirect } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      username: '',
      purpose: '',
      areas: [],
      currentArea: 0,
      currentListings: []
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
        .then(areaData => this.setState({...this.state, areas: areaData}))
      })
      .catch(err => console.error(err));
  }

  getListings = (listings) => {
    this.setState({...this.state, currentListings: listings})
  }

  render () {
    return (
      <div>
      <header className="areas-page-header">
        <h1 className="header-text-area">
          Vacation Rentals Around Denver
          {this.state.isLoggedIn && <button className='sign-out-btn' type='button' onClick={this.signOut}>Sign out!</button>}
        </h1>
        {!this.state.isLoggedIn && <Redirect to='/' />}
        </header>
        <main className='App'>
          <Route
            exact path='/'
            render={() => (
              <section className="login-page">
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
                  {!this.state.isLoggedIn && <Redirect to='/' />}
                </header>
                <Areas
                  data={this.state.areas}
                  purpose={this.state.purpose}
                  username={this.state.username}
                  getListings={this.getListings}
                />
              </section>
            )}
          />
          <Route
            exact
            path='/areas/:area_id/listings'
            render={({ match }) => (
              <section>
                <Listings
                  areaId={match.params.area_id}
                  listings={this.state.currentListings}
                  />
                {console.log(match.params.area_id)}
                {console.log(this.state)}
              </section>
            )}
          />
          <Route 
            exact
            path='/areas/:area_id/listings/:listing_id'
            render={({match})=> (
              <ListingDetails listing_id={match.params.listing_id} />
            )}
          />
        </main>
        </div>
      );
    }
}

export default App;
