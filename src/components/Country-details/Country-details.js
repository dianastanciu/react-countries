import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Emphasized = styled.span`
    font-weight: 600;
    padding-right: 5px;
`;

const CountryDetail = styled.p`
    margin: 5px 0;
`;

const BackButton = styled.div`
    margin-bottom: 30px;
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
                    <BackButton>
                        <Link to={'/'}>
                            <span className="country-border-state-label back-button">
                                <FontAwesomeIcon icon={faArrowLeft}/> Back
                            </span>
                        </Link>
                    </BackButton>

                    <Row>
                        <Col xs={12} sm={6}>
                            <img className="country-details-flag" src={this.state.country.flag} alt={this.state.country.name} width={100} height={50}/>
                        </Col>
                        <Col xs={12} sm={6}>
                            <h2 className="country-details-name"><strong>{this.state.country.name}</strong></h2>
                            <br/>
                            <Row>
                                <Col sm={6} xs={12}>
                                    <CountryDetail><Emphasized>Native name:</Emphasized> {this.state.country.nativeName}</CountryDetail>
                                    <CountryDetail>
                                        <Emphasized>Population:</Emphasized>&nbsp;
                                        {
                                            (this.state.country.population === 0) ?
                                                'Uninhabited'
                                                :
                                                <NumberFormat value={this.state.country.population} displayType={'text'} thousandSeparator={true}/>
                                        }
                                    </CountryDetail>
                                    <CountryDetail><Emphasized>Region:</Emphasized>{(this.state.country.region) ? this.state.country.region : 'N/A'}</CountryDetail>
                                    <CountryDetail><Emphasized>Subregion:</Emphasized>{(this.state.country.subregion) ? this.state.country.subregion : 'N/A'}</CountryDetail>
                                    <CountryDetail><Emphasized>Capital:</Emphasized>{(this.state.country.capital) ? this.state.country.capital : 'N/A'}</CountryDetail>
                                </Col>
                                <Col sm={6} xs={12} className="country-details-info-col">
                                    <CountryDetail><Emphasized>Top Level Domain:</Emphasized> {this.state.country.topLevelDomain}</CountryDetail>
                                    <CountryDetail><Emphasized>Currencies:</Emphasized> {this.state.country.currencies.map(currency => currency.name + '. ')}</CountryDetail>
                                    <CountryDetail><Emphasized>Languages:</Emphasized> {this.state.country.languages.map(language => language.name + '. ')}</CountryDetail>
                                </Col>
                            </Row>
                            <br/>
                            {(this.state.borders.length) ?
                                <div>
                                    <Emphasized>Border countries:</Emphasized>
                                    {this.state.borders.map(borderCountryName => <span className="country-border-state-label">{borderCountryName}</span>)}
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
