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
    render() {
        return(
            <Router>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <div className="container">
                            <CountriesList/>
                        </div>
                    </Route>
                    <Route path="/country-details/:id" component={CountryDetails} />
                    <Route path="*" component={NoMatch} />
                </Switch>
            </Router>
        );
    }
}

export default App;
