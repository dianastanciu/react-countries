import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { Container, Row, Col } from 'react-bootstrap';

const CountryBorderStateLabel = styled.span`
    box-shadow: 2px 2px 7px 1px rgba(0,0,0,.2);
    margin-right: 10px;
    margin-bottom: 20px;
    padding: 3px 10px;
    display: inline-block;
`;

class CountryDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id : props.match.params.id,
            country: [],
            exists: false,
            borders: [],
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
                let borders3Alpha = result.borders.map(borderCountry => borderCountry);

                (!result) ?
                    this.props.history.push("/")
                    :
                    this.setState( {
                        exists: true,
                        country: result,
                        borders: [
                            ...this.state.borders,
                            ...borders3Alpha.map(item => {
                                let re = data.find(country => country.alpha3Code === item);
                                return re.name;
                            })
                        ]
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
                                    <p>
                                        Population:&nbsp;
                                        {
                                            (this.state.country.population === 0) ?
                                                'Uninhabited'
                                                :
                                                <NumberFormat value={this.state.country.population} displayType={'text'} thousandSeparator={true}/>
                                        }
                                    </p>
                                    <p>Region: {(this.state.country.region) ? this.state.country.region : 'N/A'}</p>
                                    <p>Subregion: {(this.state.country.subregion) ? this.state.country.subregion : 'N/A'}</p>
                                    <p>Capital: {(this.state.country.capital) ? this.state.country.capital : 'N/A'}</p>
                                </Col>
                                <Col>
                                    <p>Top Level Domain: {this.state.country.topLevelDomain}</p>
                                    <p>Currencies: {this.state.country.currencies.map(currency => currency.name + '. ')}</p>
                                    <p>Languages: {this.state.country.languages.map(language => language.name + '. ')}</p>
                                </Col>
                            </Row>

                            {(this.state.borders.length) ?
                                <div>
                                    Border countries:
                                    {this.state.borders.map(borderCountryName => <CountryBorderStateLabel>{borderCountryName}</CountryBorderStateLabel>)}
                                </div>
                                :
                                <div>
                                    There are no border countries
                                </div>
                            }
                        </Col>
                    </Row>
                </Container>
                : ''
        )
    }
}

export default withRouter(CountryDetails);
