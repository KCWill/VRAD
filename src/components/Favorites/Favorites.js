import React, {Component} from 'react';
import './Favorites.css';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <section>
        {this.props.userFavorites.map((favorite)=> ` favorite`)}
        {!this.props.userFavorites.length && <h3>Add some favorites!</h3>}
      </section>
    )
  }
}

export default Favorites
