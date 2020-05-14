import React, {Component} from 'react';

class Area extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
        <section>
            <h2>{`${this.props.data.name} (${this.props.shortName})`}</h2>
            <p>{this.props.data.about}</p>
            <button type='button' onClick='handleClick()' >View Listings</button>
        </section>
        )
    }
}
export default Area