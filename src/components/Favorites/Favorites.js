import React, {Component} from 'react';
import './Favorites.css';
import ListingCard from '../ListingCard/ListingCard.js';
import Sidebar from '../Sidebar/Sidebar.js';
import {Link} from 'react-router-dom'

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <section className="listings-page">
        <Sidebar username={this.props.username} purpose={this.props.purpose} allFavorites={this.props.allFavorites}/>
        <section className="listings-main-view">
          <Link to={`/areas`} className="back-to-list"> View All Listings in Area </Link>
          {this.props.allFavorites.map((favorite)=> {
            return <ListingCard listingURL={`/api/v1/listings/${favorite}`} allFavorites={this.props.allFavorites} addFavorite={this.props.addFavorite} removeFavorite={this.props.removeFavorite} favoriteView={true}/>
          })}
          {!this.props.allFavorites.length && <h3 className="add-favs">Add some favorites!</h3>}
        </section>
      </section>
    )
  }
}

export default Favorites
