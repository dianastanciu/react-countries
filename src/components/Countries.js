import React from 'react';

const Countries = ({ countries }) => {
    return (
        <div>
            <h1>Countries list:</h1>
            {countries.map((country) => (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{country.name}</h5>
                        <img src={country.flag} alt="country name"/>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Countries;