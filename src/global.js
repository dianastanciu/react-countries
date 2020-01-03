import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({theme}) => theme.body};
    color: ${({theme}) => theme.text};
    transition: all 0.15s linear;
  }
  
  nav {
    background: ${({theme}) => theme.header};
    color: ${({theme}) => theme.text};
  }
  
  nav button {
    color: ${({theme}) => theme.text}
  }
  
  input,
  input::placeholder,
  select,
  .country-card-info,
  .country-card a {
    background: ${({theme}) => theme.element}
    color: ${({theme}) => theme.text}
  }
  `;