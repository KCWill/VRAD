import React, {Component} from 'react';
import './Area.css'

class Area extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <section className="area">
        <h2 className="area-name">{`${this.props.data.name} (${this.props.shortName})`}</h2>
        <p className="about">{this.props.data.about}</p>
        <button className="view-listings-btn"type='button'>View Listings</button>
      </section>
    )
  }
}
export default Area
