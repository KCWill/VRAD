import './Listings.css';
import Sidebar from '../Sidebar/Sidebar.js';
import ListingCard from '../ListingCard/ListingCard.js';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  // Used the same class names as the areas, need to change in the future, but it
  // does the job for now.
  render() {
    return (
      <section className='listings-page'>
        <Sidebar username={this.props.username} purpose={this.props.purpose} allFavorites={this.props.allFavorites}/>
        <section className="listings-main-view">
          <Link to='/areas' className="back-to-areas-btn">Back to areas of Denver</Link>
          <section className="listings-card-holder">
            {this.props.listings.map( (listing, index) => <ListingCard key={`${index}`} listingURL={listing} allFavorites={this.props.allFavorites} addFavorite={this.props.addFavorite} removeFavorite={this.props.removeFavorite}/> )}
          </section>
        </section>
      </section>
  )}
}

export default Listings
