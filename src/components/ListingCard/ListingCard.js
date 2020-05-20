import './ListingCard.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ListingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      viewThisListing: false,
      favorited: this.props.favoriteView || false
    }
  }

  displayListingDetails = () => {
    this.setState({...this.state, viewThisListing: true});
  }

  markFavorite = () => {
    this.props.addFavorite(this.state.data.listing_id);
    this.setState({...this.state, favorited: true})
  }

  unmarkFavorite = () => {
    this.props.removeFavorite(this.state.data.listing_id);
    this.setState({...this.state, favorited: false})
  }

  // Add new method to remove favorite
  // will also add the same method to listing Details
  // making sure that the fav button instead says remove from fav when that listing is faved.

  componentDidMount = () => {
    fetch(`https://vrad-api.herokuapp.com${this.props.listingURL}`)
    .then(response => response.json())
    .then(data => this.setState({...this.state, data}))
    .catch(err => console.log(err))
  }

  render() {
    return (
    <section className='listing-cards'>
      <h3 className="listing-name">{this.state.data.name}</h3>
      <img src={`/images/${this.state.data.listing_id}_a.jpg`} className='listing-main-image'/>
        <div className="view-and-fav-btns">
          <button className='view-details-btn' type='button' onClick={this.displayListingDetails}>
            View Listing Details
          </button>
          {!this.state.favorited && <button type='button' onClick={this.markFavorite} className='add-to-favs-btn-list-page'>
            Favorite This Listing
          </button>}
          {this.state.favorited && <button type='button' onClick={this.unmarkFavorite} className='add-to-favs-btn-list-page'>
            Remove This Listing
          </button>}
        </div>
      {this.state.viewThisListing && <Redirect to={`/areas/${this.state.data.area_id}/listings/${this.state.data.listing_id}`}/>}
    </section>
  )}
}


export default ListingCard
