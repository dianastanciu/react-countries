import React from 'react';

const CountriesAPI = () => {
    return fetch('https://restcountries.eu/rest/v2/all')
            .then(res => res.json())
};

export default CountriesAPI;