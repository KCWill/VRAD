import React, {Component} from 'react';

class Area extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    handleClick = () => {
        console.log('hello')
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
            <button type='button' onClick={this.handleClick}>
                View Listings
            </button>
        </section>
        )
    }
}
export default Area