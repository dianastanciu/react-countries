import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CountryCard from '../Country-card/Country-card';
import styled from 'styled-components';
import CountriesAPI from '../../services/CountriesAPI';
import { Container, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMoon, faSearch, faSun} from '@fortawesome/free-solid-svg-icons';

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
            <Container>
                <Spinner animation="grow" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                Loading...
            </Container>
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
                    <FilterSection>
                        <SearchInput>
                            <FontAwesomeIcon icon={faSearch}/>
                            <Label for="searchInput">Search for a country...</Label>
                            <Input id="searchInput" type="text" placeholder={'Search for a country...'} onKeyUp={search}/>
                        </SearchInput>
                        <Label for="selectRegion">Filter by region</Label>
                        <Select id="selectRegion" className="select-region" onChange={change}>
                            <option value="" hidden>Filter by region</option>
                            <option value="All">All</option>
                            {distinctRegionsItem.map(item => {
                                return <option key={item} value={item}>{item}</option>
                            })}
                        </Select>
                    </FilterSection>
                    <Row>
                        {dataList
                            .filter(country => !selectedRegion || selectedRegion === 'All' || country.region === selectedRegion)
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
    border-radius: 5px;
    font-size: 13px;
    width: 100%;
`;

const Label = styled.label`
    position: absolute;
    top: -99999px;
    left: -99999px;
    opacity: 0;
`;

const FilterSection = styled.div`
    margin: 0 0 35px;
    display: flex;
    justify-content: space-between;
    
    @media screen and (max-width: 575px) {
        flex-direction: column;
        
        select {
            width: 60%;
            margin-top: 30px;
        }
    }
`;

const SearchInput = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    
    svg {
        margin-left: 15px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
    }
`;
