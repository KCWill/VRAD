import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import './Area.css'

class Area extends Component {
  constructor(props){
    super(props);
    this.state = {
      viewListings: false
    };
  }

  displayListings = () => {
    this.setState({...this.state, viewListings: true});
    this.props.getListings(this.props.data.listings);
  }

  render(){
    return (
      <section className="area">
        <h2 className="area-name">
          {`${this.props.data.name} (${this.props.shortName})`}
        </h2>
        <p className="about">
          {this.props.data.about}
        </p>
        <button className="view-listings-btn" type='button' onClick={this.displayListings}>
          View Listings
        </button>
        {this.state.viewListings && <Redirect to={`/areas/${this.props.data.id}/listings`} />}
      </section>
    )
  }
}
export default Area
