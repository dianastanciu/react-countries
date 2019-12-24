import React, { Component, useState, useEffect, useRef } from 'react';
import CountryCard from '../Country-card/Country-card';
import styled from 'styled-components';
import CountriesAPI from '../../services/CountriesAPI';

const CardList = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
`;

const Select = styled.select`
    border: 0;
    padding: 15px 20px;
    box-shadow: 0 0 7px rgba(0,0,0,.08);
    border-radius: 5px;
    font-size: 13px;
    color: #888;
`;

const Input = styled.input`
    border: 0;
    padding: 15px 20px 15px 45px;
    box-shadow: 0 0 7px rgba(0,0,0,.08);
    border-radius: 5px;
    font-size: 13px;
    color: #888;
    width: 35%;
`;

export default function CountriesList() {
    const [data, setData] = useState([]);
    const [distinctRegions, setDistinctRegions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState('');

    useEffect(() => {
        CountriesAPI().then(res => {
            onLoad(res);
            setLoading(false);
        });
    }, []);

    const onLoad = dataList => {
        setData(...data, dataList);
        getRegions(dataList);
    };

    const getRegions = dataList => {
        let regions = [];

        dataList.map(dataItem => dataItem.region.length ? regions.push(dataItem.region) : '');

        let regionsFiltered = regions.filter((item, index, arr) => arr.indexOf(item) === index);

        setDistinctRegions(...distinctRegions, regionsFiltered);
    };

    const renderLoading = () => {
        return <div>Loading...</div>
    };

    const change = event => {
        setSelectedRegion(event.target.value);
    };

    const renderData = (dataList, distinctRegionsItem) => {
        if (dataList && dataList.length) {
            return (
                <div>
                    <Container>
                        <Input type="text" placeholder="Search for a country..."/>
                        <Select className="select-region" onChange={change}>
                            <option value="" hidden>Filter by region</option>
                            {distinctRegionsItem.map(item => {
                                return <option key={item} value={item}>{item}</option>
                            })}
                        </Select>
                    </Container>
                    <CardList>
                        {dataList
                            .filter(country => !selectedRegion || country.region === selectedRegion)
                            .map(country => (
                            <CountryCard
                                population={country.population}
                                region={country.region}
                                capital={country.capital}
                                flag={country.flag}
                                key={country.alpha3Code}
                                id={country.alpha3Code}
                                name={country.name}
                            />
                        ))}
                    </CardList>
                </div>
            )
        } else {
            return <div>No items found</div>
        }
    };

    return loading ?
        renderLoading()
        :
        renderData(data, distinctRegions);
}
