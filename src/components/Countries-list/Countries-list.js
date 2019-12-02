import React, { Component } from 'react';
import CountryCard from '../Country-card/Country-card';

class CountriesList extends Component {
    render() {
        return (
            <div>
                {this.props.countries.map((country) => (
                    <CountryCard
                        key={country.alpha3Code}
                        id={country.alpha3Code}
                        name={country.name}
                    />
                ))}
            </div>
        )
    }
}

export default CountriesList;
