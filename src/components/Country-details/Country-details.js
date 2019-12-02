import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class CountryDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id : props.match.params.id,
            country: [],
            exists: false,
        };
    }

    componentDidMount() {
        return this.fetchData();
    }

    fetchData() {
        return fetch('https://restcountries.eu/rest/v2/all')
            .then(res => res.json())
            .then(data => {
                let result = data.find(country => country.alpha3Code === this.state.id);

                (!result) ?
                    this.props.history.push("/")
                    :
                    this.setState( {
                        exists: true,
                        country: result
                    });
            })
            .catch(err => console.log(err));
    }

    render() {
        return(
            (this.state.exists) ?
                <div>
                    <p>Name: {this.state.country.name}</p>
                    <p>Main currency: {this.state.country.currencies[0].name}</p>
                    <p>Population: {this.state.country.population}</p>
                    <p>Flag: <img src={this.state.country.flag} alt={this.state.country.name} width={100} height={50}/></p>
                </div>
                : ''
        )
    }
}

export default withRouter(CountryDetails);
