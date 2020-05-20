import React, {Component} from 'react';
import './Favorites.css';
import ListingCard from '../ListingCard/ListingCard.js'

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <section className="lisitings-card-holder">
        {this.props.userFavorites.map((favorite)=> {
           return <ListingCard listingURL={`/api/v1/listings/${favorite}`} />
        })}
        {!this.props.userFavorites.length && <h3>Add some favorites!</h3>}
      </section>
    )
  }
}

export default Favorites
