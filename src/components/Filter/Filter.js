import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
    border: 0;
    padding: 15px 20px;
    box-shadow: 0 0 7px rgba(0,0,0,.08);
    border-radius: 5px;
    font-size: 13px;
    color: #888;
`;

const Filter = () => {
    return(
        <Select>
            <option>Filter by region</option>
        </Select>
    );
};

export default Filter;