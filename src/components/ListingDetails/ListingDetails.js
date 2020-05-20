import './ListingDetails.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar.js'
import { getListingDetails } from '../../apiCalls';

class ListingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
        area_id: 0,
        streetAddress:'',
        zipCode: 0,
        numBedrooms: 0,
        numBathrooms: 0,
        costPerNight: 0,
        features: [],
        favorited: false,
    }
  }
  // React kept saying that keys were undefined without explicitly writing out the data structure below
  // tried doing it without and couldn't get it to work
  componentDidMount = async () => {
    const listingDetails = await getListingDetails(this.props.listing_id);
    this.setState({
      ...this.state,
      area_id: listingDetails.area_id,
      streetAddress: listingDetails.address.street,
      zipCode: listingDetails.address.zip,
      numBedrooms: listingDetails.details.beds,
      numBathrooms: listingDetails.details.baths,
      costPerNight: listingDetails.details.cost_per_night,
      features: listingDetails.details.features
      });
  }

  markFavorite = () => {
    this.props.addFavorite(this.props.listing_id);
    this.setState({...this.state, favorited: true})
  }

  unmarkFavorite = () => {
    this.props.removeFavorite(this.props.listing_id);
    this.setState({...this.state, favorited: false})
  }

  render() {
    return (
      <section className="listings-dets-page">
        <Sidebar username={this.props.username} purpose={this.props.purpose} allFavorites={this.props.allFavorites}/>
      <section className='listing-details'>
        <div className="listing-dets-holder">
          <h4>Listing Details</h4>
          <h5>Street Address: {this.state.streetAddress}</h5>
          <h5>Zip Code: {this.state.zipCode}</h5>
          <h5>Number of Beds: {this.state.numBedrooms}</h5>
          <h5>Number of Bathrooms: {this.state.numBathrooms}</h5>
          <h5>Cost Per Night: ${this.state.costPerNight}</h5>
          <ul key='Features list'>Features: {this.state.features.map((feature, index)=> <li key={`${index}`}>{feature}</li>)}</ul>
          {!this.state.favorited && <button type='button' onClick={this.markFavorite} className='add-to-favs-btn-list-page'>
            Favorite This Listing
          </button>}
          {this.state.favorited && <button type='button' onClick={this.unmarkFavorite} className='add-to-favs-btn-list-page'>
            Remove This Listing
          </button>}
          <Link to={`/areas/${this.state.area_id}/listings`} className="back-to-list"> View All Listings in Area </Link>
        </div>
        <div className="image-holder">
          <img src={`/images/${this.props.listing_id}_a.jpg`} alt='listing detail' className='listing-photos' />
          <img src={`/images/${this.props.listing_id}_b.jpg`} alt='listing detail' className='listing-photos' />
          <img src={`/images/${this.props.listing_id}_c.jpg`} alt='listing detail' className='listing-photos' />
        </div>
      </section>
      </section>
  )}
}

export default ListingDetails
