import React, { Component } from 'react';
import CountryCard from '../Country-card/Country-card';
import Sort from '../Sort/Sort';

class CountriesList extends Component {
    render() {
        return (
            <div className="container">
                <Sort />
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
