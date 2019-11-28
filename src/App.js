import React, { Component } from 'react';
import './App.css';
import Countries from './components/Countries/Countries';

class App extends Component {
    constructor() {
        super();

        this.state = {
            countries: []
        };
    }

    componentDidMount() {
        return this.fetchData();
    }

    fetchData() {
        return fetch('https://restcountries.eu/rest/v2/all')
            .then(res => res.json())
            .then(data => this.setState({ countries: data }))
            .catch(err => console.log(err));
    }

    render() {
        return(
          <div>
              <div>Loading countries data.</div>
              <Countries countries={this.state.countries} />
          </div>
        );
    }
}

export default App;
