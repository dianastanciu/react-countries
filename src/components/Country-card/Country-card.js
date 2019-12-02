import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Card = styled.div`
    border: 1px dotted rgba(0,0,0,.3);
    margin-bottom: 10px;
`;

class CountryCard extends Component {
    render() {
        return(
            <Card>
                <Link to={`country-details/${this.props.id}`}>
                    <button>{this.props.name}</button>
                </Link>
            </Card>
        )
    }
}

export default CountryCard;
