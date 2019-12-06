import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Card = styled.div`
    margin-bottom: 10px;
    width: 25%;
    text-align: center;
    
    a {
        background: #fff;
        margin: 10%;
        display: block;
        border-radius: 5px;
        text-decoration: none;
    }
    
    img {
        width: 100%;
    }
`;

const CardInfo = styled.div`
    text-align: left;
    color: #000;
    padding: 0 20px 20px 20px;
    font-size: 14px;
    
    h2 {
        font-size: 18px;
    }
`;

class CountryCard extends Component {
    render() {
        return(
            <Card>
                <Link to={`country-details/${this.props.id}`}>
                    <img src={this.props.flag} alt=""/>
                    <CardInfo>
                        <h2>{this.props.name}</h2>
                        <p><strong>Population</strong>: {this.props.population}</p>
                        <p><strong>Region</strong>: {this.props.region}</p>
                        <p><strong>Capital</strong>: {this.props.capital}</p>
                    </CardInfo>
                </Link>
            </Card>
        )
    }
}

export default CountryCard;
