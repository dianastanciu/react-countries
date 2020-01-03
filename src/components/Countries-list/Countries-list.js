import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CountryCard from '../Country-card/Country-card';
import styled from 'styled-components';
import CountriesAPI from '../../services/CountriesAPI';
import {Container, Row} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

const Select = styled.select`
    border: 0;
    padding: 15px 20px;
    box-shadow: 0 0 7px rgba(0,0,0,.08);
    border-radius: 5px;
    font-size: 13px;
`;

const Input = styled.input`
    border: 0;
    padding: 15px 20px 15px 45px;
    box-shadow: 0 0 7px rgba(0,0,0,.08);
    border-radius: 5px;
    font-size: 13px;
    width: 35%;
`;

export default function CountriesList() {
    const [data, setData] = useState([]);
    const [distinctRegions, setDistinctRegions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

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
        return(
            <div>
                <Spinner animation="grow" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                Loading...
            </div>
        );
    };

    const change = event => {
        setSelectedRegion(event.target.value);
    };

    const search = event => {
        setSearchTerm(event.target.value);
    };

    const renderData = (dataList, distinctRegionsItem) => {
        if (dataList && dataList.length) {
            return (
                <Container>
                    <div>
                        <Input type="text" placeholder={'Search for a country...'} onKeyUp={search}/>
                        <Select className="select-region" onChange={change}>
                            <option value="" hidden>Filter by region</option>
                            {distinctRegionsItem.map(item => {
                                return <option key={item} value={item}>{item}</option>
                            })}
                        </Select>
                    </div>
                    <Row>
                        {dataList
                            .filter(country => !selectedRegion || country.region === selectedRegion)
                            .filter(country => country.name.toLowerCase().indexOf( searchTerm.toLowerCase() ) !== -1)
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
                    </Row>
                </Container>
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
