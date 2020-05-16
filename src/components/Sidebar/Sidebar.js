import React, {Component} from 'react';
import './Sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <section className='sidebar'>
        <h2 className="greeting">{`Welcome, ${this.props.username}`}</h2>
          {this.props.purpose === 'Vacation' && (<h3 className="choose-message">Choose from these four wonderful areas of Denver for your vacation.</h3>)}
          {this.props.purpose === 'Business' && (<h3 className="choose-message">Choose from these four wonderful areas of Denver for your business trip.</h3>)}
          {this.props.purpose === 'Other' && (<h3 className="choose-message">Choose from these four wonderful areas of Denver for your trip. We're not asking questions.</h3>)}
        <button className="view-fav-btn" type="button">View Favorites</button>
      </section>
    )
  }
}

export default Sidebar
