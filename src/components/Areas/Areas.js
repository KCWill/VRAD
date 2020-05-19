import React, {Component} from 'react';
import './Areas.css';
import Area from '../Area/Area.js'
import Sidebar from '../Sidebar/Sidebar.js'

class Areas extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <section className='areas-page'>
        <Sidebar username={this.props.username} purpose={this.props.purpose}/>
        <section className='area-container'>
          {this.props.data.map((location, index) => {
            return (
              <div className='area-card' key={index}>
                <Area data={location} shortName={location.shortName} getListings={this.props.getListings}/>
              </div>
          )}
          )}
        </section>
      </section>
    )
  }
}
export default Areas
