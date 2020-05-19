import './ListingDetails.css';
import React, { Component } from 'react';


class ListingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
        streetAddress:'',
        zipCode:0,
        numBedrooms: 0,
        numBathrooms: 0,
        costPerNight: 0,
        features: [],
        favorited: false,
    }
  }

  componentDidMount = () => {
      fetch(`https://vrad-api.herokuapp.com/api/v1/listings/${this.props.listing_id}`)
      .then(response => response.json())
      .then(data => this.setState({
        ...this.state,
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
    console.log('favorite!')
  }

  render() {
    return ( 
    <section>
        {console.log('listingDetails', this.state.streetAddress)}
        <h5>Listing Details</h5>
        <h4>Street Address: {this.state.streetAddress}</h4>
        <h4>Zip Code: {this.state.streetAddress}</h4>
        <h4>Number of Beds: {this.state.numBedrooms}</h4>
        <h4>Number of Bathrooms: {this.state.numBathrooms}</h4>
        <h4>Cost Per Night: {this.state.costPerNight}</h4>
        <h4>Features: {this.state.features.map((feature)=> ` ${feature}`)}</h4>
        <button type='button' onClick={this.markFavorite} className='view-listings-btn'>
            Favorite This Listing
        </button>
    </section> 
    )}
}


export default ListingDetails
