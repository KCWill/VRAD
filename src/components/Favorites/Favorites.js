import React, {Component} from 'react';
import './Favorites.css';
import ListingCard from '../ListingCard/ListingCard.js';
import Sidebar from '../Sidebar/Sidebar.js';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <section className="lisitings-card-holder">
        <Sidebar username={this.props.username} purpose={this.props.purpose} allFavorites={this.props.allFavorites}/>
        <section className="favs-holder">
          {this.props.allFavorites.map((favorite)=> {
            return <ListingCard listingURL={`/api/v1/listings/${favorite}`} allFavorites={this.props.allFavorites} addFavorite={this.props.addFavorite} />
          })}
          {!this.props.allFavorites.length && <h3>Add some favorites!</h3>}
        </section>
      </section>
    )
  }
}

export default Favorites
