import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { Container, Row, Col } from 'react-bootstrap';


class CountryDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id : props.match.params.id,
            country: [],
            exists: false,
        };
    }

    componentDidMount() {
        return this.fetchData();
    }

    fetchData() {
        return fetch('https://restcountries.eu/rest/v2/all')
            .then(res => res.json())
            .then(data => {
                let result = data.find(country => country.alpha3Code === this.state.id);

                (!result) ?
                    this.props.history.push("/")
                    :
                    this.setState( {
                        exists: true,
                        country: result
                    });
            })
            .catch(err => console.log(err));
    }

    render() {
        return(
            (this.state.exists) ?
                <Container>
                    <Link to={'/'}>Back</Link>

                    <Row>
                        <Col>
                            <img className="country-details-flag" src={this.state.country.flag} alt={this.state.country.name} width={100} height={50}/>
                        </Col>
                        <Col>
                            <h1>{this.state.country.name}</h1>

                            <Row>
                                <Col>
                                    <p>Native name: {this.state.country.nativeName}</p>
                                    <p>Population: <NumberFormat value={this.state.country.population} displayType={'text'} thousandSeparator={true}/></p>
                                    <p>Region: {this.state.country.region}</p>
                                    <p>Subregion: {this.state.country.subregion}</p>
                                    <p>Capital: {this.state.country.capital}</p>
                                </Col>
                                <Col>
                                    <p>Top Level Domain: {this.state.country.topLevelDomain}</p>
                                    <p>Currencies: {this.state.country.currencies.map(currency => currency.name + '. ')}</p>
                                    <p>Languages: {this.state.country.languages.map(language => language.name + '. ')}</p>
                                </Col>
                            </Row>

                            <div>
                                Border countries: {this.state.country.borders.map(borderCountry => borderCountry)};
                            </div>
                        </Col>
                    </Row>
                </Container>
                : ''
        )
    }
}

export default withRouter(CountryDetails);
