import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    border: 0;
    padding: 15px 20px 15px 45px;
    box-shadow: 0 0 7px rgba(0,0,0,.08);
    border-radius: 5px;
    font-size: 13px;
    color: #888;
    width: 35%;
`;

const Search = () => {
    return(
        <Input type="text" placeholder="Search for a country..."/>
    );
};

export default Search;