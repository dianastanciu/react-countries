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

const Sort = (data) => {
    let regions = [];

    data.data.map(dataItem => {
        if(dataItem.region.length) regions.push(dataItem.region);
    });

    let distinctRegions = regions.filter((item, i, arr) => {
        return arr.indexOf(item) === i;
    });

    return(
        <Container>
            <Search />
            <Filter items={distinctRegions} dataItems={data}/>
        </Container>
    );
};

export default Sort;