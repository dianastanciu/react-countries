import React, { useState } from 'react';
import './App.css';
import CountriesList from './components/Countries-list/Countries-list';
import NoMatch from './components/NoMatch/NoMatch';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import CountryDetails from "./components/Country-details/Country-details";
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Nav = styled.nav`
    padding: 0 85px;
    box-shadow: 1px 2px 4px rgba(0,0,0,.2);
    position: relative;
    
    ul {
        padding: 0;
        margin: 0; 
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const ThemeToggler = styled.button`
    background: none;
    border: 0;
    padding: 10px;
    text-transform: capitalize; 
`;

export default function App() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => (theme === 'light') ? setTheme('dark') : setTheme('light');

    return(
        <Router>
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyles />
                <Nav>
                    <ul>
                        <li>
                            <h2>Where in the world?</h2>
                        </li>
                        <li>
                            <ThemeToggler onClick={toggleTheme}>
                                <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun}/>
                                {theme === 'light' ? ' Dark ' : ' Light '}mode
                            </ThemeToggler>
                        </li>
                    </ul>
                </Nav>
                <Switch>
                    <Route path="/" exact>
                        <div className="container">
                            <CountriesList/>
                        </div>
                    </Route>
                    <Route path="/country-details/:id" component={CountryDetails} />
                    <Route path="*" component={NoMatch} />
                </Switch>
            </ThemeProvider>
        </Router>
    );
}
