import './ListingDetails.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
        area_id: 0,
        streetAddress:'',
        zipCode:0,
        numBedrooms: 0,
        numBathrooms: 0,
        costPerNight: 0,
        features: [],
        favorited: false,
    }
  }
  // React kept saying that keys were undefined without explicitly writing out the data structure below
  // tried doing it without and couldn't get it to work
  componentDidMount = () => {
    fetch(`https://vrad-api.herokuapp.com/api/v1/listings/${this.props.listing_id}`)
    .then(response => response.json())
    .then(data => this.setState({
      ...this.state,
      area_id: data.area_id,
      streetAddress:data.address.street,
      zipCode: data.address.zip,
      numBedrooms: data.details.beds,
      numBathrooms: data.details.baths,
      costPerNight: data.details.cost_per_night,
      features: data.details.features
      }))
    .catch(err => console.log(err))
  }

  markFavorite = () => {
    this.props.addFavorite(this.props.listing_id);
  }

  render() {
    return (
      <section className='listing-details'>
        {console.log('listingDetails', this.state.streetAddress)}
        <h5>Listing Details</h5>
        <h4>Street Address: {this.state.streetAddress}</h4>
        <h4>Zip Code: {this.state.streetAddress}</h4>
        <h4>Number of Beds: {this.state.numBedrooms}</h4>
        <h4>Number of Bathrooms: {this.state.numBathrooms}</h4>
        <h4>Cost Per Night: {this.state.costPerNight}</h4>
        <h4>Features: {this.state.features.map((feature)=> ` ${feature}`)}</h4>
        <img src={`/images/${this.props.listing_id}_a.jpg`} className='listing-photos' />
        <img src={`/images/${this.props.listing_id}_b.jpg`} className='listing-photos' />
        <img src={`/images/${this.props.listing_id}_c.jpg`} className='listing-photos' />
        <button type='button' onClick={this.markFavorite} className='add-to-favs-btn'>
          Favorite This Listing
        </button>
        <Link to={`/areas/${this.state.area_id}/listings`} > View All Listings in Area </Link>
      </section>
  )}
}

export default ListingDetails
