import React, { Component } from 'react';
import './App.css';
import CountriesList from './components/Countries-list/Countries-list';
import NoMatch from './components/NoMatch/NoMatch';
import Header from './components/Header/Header';
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
                        <Header />
                        <CountriesList countries={this.state.countries}/>
                    </Route>
                    <Route path="/country-details/:id">
                        <Header />
                        <CountryDetails/>
                    </Route>
                    <Route path="*" component={NoMatch} />
                </Switch>
            </Router>
        );
    }
}

export default App;
