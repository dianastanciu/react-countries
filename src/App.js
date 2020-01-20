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
import { Container } from 'react-bootstrap';

export default function App() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => (theme === 'light') ? setTheme('dark') : setTheme('light');

    return(
        <Router>
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyles />
                <Nav>
                    <Container>
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
                    </Container>
                </Nav>
                <Switch>
                    <Route path="/" exact>
                        <CountriesList/>
                    </Route>
                    <Route path="/country-details/:id" component={CountryDetails} />
                    <Route path="*" component={NoMatch} />
                </Switch>
            </ThemeProvider>
        </Router>
    );
}

const Nav = styled.nav`
    box-shadow: 1px 2px 4px rgba(0,0,0,.2);
    position: relative;
    margin-bottom: 30px;
    padding: 10px 0;
    
    ul {
        padding: 0;
        margin: 0; 
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    h2 {
        font-size: 22px;
        font-weight: 700;
    }
    
    @media screen and (max-width: 412px) {
        h2 { 
            font-size: 18px;
            margin: 0;
        }
    } 
`;

const ThemeToggler = styled.button`
    background: none;
    border: 0;
    padding: 10px;
    text-transform: capitalize; 
    font-size: 15px;
    font-weight: 600;
    
    @media screen and (max-width: 412px) {
        font-size: 13px;
    } 
`;
