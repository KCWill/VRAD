import React, {Component} from 'react';
import './App.css';
import Areas from '../Areas/Areas.js';
import Login from '../Login/Login.js';
import Listings from '../Listings/Listings.js';
import ListingDetails from '../ListingDetails/ListingDetails.js';
import Favorites from '../Favorites/Favorites.js';
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
      currentListings: [],
      userFavorites: []
    }
  }

  loggingIn = (username, purpose) => {
    this.setState({...this.state, isLoggedIn: true, username, purpose})
  }

  signOut = () => {
    this.setState({...this.state, isLoggedIn: false});
  }

  addFavorite = (favId) => {
    this.setState({...this.state, userFavorites: [...this.state.userFavorites, favId]})
  }

  removeFavorite = (cardId) => {
    let updatedFavs = this.state.userFavorites.filter(fav => {
      return cardId !== fav
    });
    this.setState({...this.state, userFavorites: updatedFavs})
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
                  allFavorites={this.state.userFavorites}
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
                  purpose={this.state.purpose}
                  username={this.state.username}
                  areaId={match.params.area_id}
                  listings={this.state.currentListings}
                  addFavorite={this.addFavorite}
                  allFavorites={this.state.userFavorites}
                  removeFavorite={this.removeFavorite} />
              </section>
            )}
          />
          <Route
            exact
            path='/areas/:area_id/listings/:listing_id'
            render={({match})=> (
              <ListingDetails
              addFavorite={this.addFavorite}
              purpose={this.state.purpose}
              username={this.state.username}
              allFavorites={this.state.userFavorites}
              listing_id={match.params.listing_id}
              removeFavorite={this.removeFavorite} />
            )}
          />
          <Route
            exact
            path='/favorites'
            render={()=>(
              <Favorites
                addFavorite={this.addFavorite}
                allFavorites={this.state.userFavorites}
                purpose={this.state.purpose}
                username={this.state.username}
                removeFavorite={this.removeFavorite} />
            )}
          />
        </main>
        </div>
      );
    }
}

export default App;
