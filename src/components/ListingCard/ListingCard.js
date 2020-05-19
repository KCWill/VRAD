import './ListingCard.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ListingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: {},
        viewThisListing: false,
    }
  }

  displayListingDetails = () => {
    this.setState({...this.state, viewThisListing: true});
  }

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
        <button className='view-details-btn' type='button' onClick={this.displayListingDetails}>
          View Listing Details
        </button>
      {this.state.viewThisListing && <Redirect to={`/areas/${this.state.data.area_id}/listings/${this.state.data.listing_id}`}/>}
    </section>
  )}
}


export default ListingCard
