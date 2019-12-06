import React, { Component } from 'react';
import CountryCard from '../Country-card/Country-card';
import Sort from '../Sort/Sort';
import styled from 'styled-components';

const CardList = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

class CountriesList extends Component {
    render() {
        return (
            <div className="container">
                <Sort />
                <CardList>
                    {this.props.countries.map((country) => (
                        <CountryCard
                            population={country.population}
                            region={country.region}
                            capital={country.capital}
                            flag={country.flag}
                            key={country.alpha3Code}
                            id={country.alpha3Code}
                            name={country.name}
                        />
                    ))}
                </CardList>
            </div>
        )
    }
}

export default CountriesList;
