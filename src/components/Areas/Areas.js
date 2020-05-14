import React, {Component} from 'react';
import './Areas.css';
import Area from '../Area/Area.js'

class Areas extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    getAreaNames = () => {
    }

    render() {
        return(
            <section className='area-container'>
                {this.props.data.map((location, index) => {
                    return (
                    <div className='area-card' key={index}>
                        <h2>{location.name}</h2>
                        <Area data={this.props}/>
                    </div>
                )}
            )}
            </section>
        )
    }
}
export default Areas