import React from 'react';
import styled from 'styled-components';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
`;

const Sort = () => {
    return(
        <Container>
            <Search />
            <Filter />
        </Container>
    );
};

export default Sort;