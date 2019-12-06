import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
    padding: 0 5%;
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

const Header = () => {
    return(
        <Nav>
            <ul>
                <li>
                    <h2>Where in the world?</h2>
                </li>
                <li>
                    <ThemeToggler>Dark mode</ThemeToggler>
                </li>
            </ul>
        </Nav>
    )
};

export default Header;