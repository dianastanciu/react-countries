import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
import { Col } from 'react-bootstrap';

const Card = styled.div`
    margin-bottom: 10px;
    padding: 0 0 20px;
    text-align: center;
    
    > a {
        display: block;
        border-radius: 5px;
        text-decoration: none;
        overflow: hidden;
        border-radius: 7px;
        box-shadow: 1px 2px 7px 5px rgba(0,0,0,.1);
    }
    
    img {
        width: 100%;
        height: 150px;
        object-fit: cover;
    }
`;

const CardInfo = styled.div`
    text-align: left;
    padding: 20px;
    font-size: 14px;
    
    h2 {
        font-size: 18px;
    }
    
    p {
        margin: 0;
    }
`;

const Emphasized = styled.span`
    font-weight: 600;
    padding-right: 5px;
`;

class CountryCard extends Component {
    render() {
        return(
            <Col xs={12} sm={6} md={4} lg={3}>
                <Card className="country-card">
                    <Link to={`country-details/${this.props.id}`}>
                        <img src={this.props.flag} alt=""/>
                        <CardInfo>
                            <h2>{this.props.name}</h2>
                            <p><Emphasized>Population:</Emphasized>
                                {
                                    (this.props.population === 0) ?
                                        'Uninhabited'
                                        :
                                        <NumberFormat value={this.props.population} displayType={'text'} thousandSeparator={true}/>
                                }
                            </p>
                            <p><Emphasized>Region:</Emphasized>{(this.props.region) ? this.props.region : 'N/A'}</p>
                            <p><Emphasized>Capital:</Emphasized>{(this.props.capital.length) ? this.props.capital : 'N/A'}</p>
                        </CardInfo>
                    </Link>
                </Card>
            </Col>
        )
    }
}

export default CountryCard;
