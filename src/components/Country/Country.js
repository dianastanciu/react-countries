import React, { Component } from 'react';
import styled from 'styled-components';

const Card = styled.div`
    border: 1px dotted rgba(0,0,0,.3);
    margin-bottom: 10px;
`;

class Country extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Card>
                {this.props.name}
            </Card>
        )
    }
}

export default Country;
