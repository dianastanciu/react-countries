import React, { Component } from 'react';
import './App.css';
import CountriesList from './components/Countries-list/Countries-list';
import NoMatch from './components/NoMatch/NoMatch';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import CountryDetails from "./components/Country-details/Country-details";


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
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <CountriesList countries={this.state.countries}/>
                    </Route>
                    <Route path="/country-details/:id" component={CountryDetails} />
                    <Route path="*" component={NoMatch} />
                </Switch>
            </Router>
        );
    }
}

export default App;
