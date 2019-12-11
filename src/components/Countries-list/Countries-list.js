import React, { Component } from 'react';
import CountryCard from '../Country-card/Country-card';
import Sort from '../Sort/Sort';
import styled from 'styled-components';
import CountriesAPI from '../../services/CountriesAPI';

const CardList = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

class CountriesList extends Component {
    constructor(props) {
        super(props);

        this.onLoad = this.onLoad.bind(this);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        CountriesAPI().then(data => this.onLoad(data));
    }

    onLoad = (data) => {
        this.setState({
            data: data
        });
    };

    renderLoading = () => {
        return <div>Loading...</div>
    };

    renderData = (data) => {
        if (data && data.length) {
            return (
                <div>
                    <Sort data={data}/>
                    <CardList>
                        {data.map((country) => (
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
        } else {
            return <div>No items found</div>
        }
    };

    render() {
        const data = this.state.data;

        return data ?
            this.renderData(data)
            :
            this.renderLoading()
    }
}

export default CountriesList;
