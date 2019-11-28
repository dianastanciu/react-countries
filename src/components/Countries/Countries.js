import React, { Component } from 'react';
import Country from '../Country/Country';

class Countries extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.countries.map((country) => (
                    <Country
                        name={country.name}
                    />
                ))}
            </div>
        )
    }
}

export default Countries;
