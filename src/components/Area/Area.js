import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class Area extends Component {
    constructor(props){
        super(props);
        this.state = {
            viewListings: false
        };
    }

    displayListings = () => {
        this.setState({...this.state, viewListings: true})
    }
        
    render(){
        return (
        <section>
            <h2>
                {`${this.props.data.name} (${this.props.shortName})`}
            </h2>
            <p>
                {this.props.data.about}
            </p>
            <button type='button' onClick={this.displayListings}>
                View Listings
            </button>
            {this.state.viewListings && <Redirect to={`/areas/${this.props.data.id}/listings`} />}
        </section>
        )
    }
}
export default Area