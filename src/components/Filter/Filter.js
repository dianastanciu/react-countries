import React, { Component } from 'react';
import styled from 'styled-components';

const Select = styled.select`
    border: 0;
    padding: 15px 20px;
    box-shadow: 0 0 7px rgba(0,0,0,.08);
    border-radius: 5px;
    font-size: 13px;
    color: #888;
`;

class Filter extends Component {
    constructor(props) {
        super(props);
    }

    change = event => {
        this.displayCountriesByRegion(event.target.value);
        console.log(this.displayCountriesByRegion(event.target.value));
    };

    displayCountriesByRegion = value => {
        return this.props.dataItems.data.filter(obj => obj.region === value);
    };

    render() {
        return(
            <Select className="select-region" onChange={this.change}>
                <option value="" hidden>Filter by region</option>
                {
                    this.props.items.map(item => {
                        return(<option key={item} value={item}>{item}</option>)
                    })
                }
            </Select>
        );
    }
}

// const Filter = (items) => {
//     let getInitialState = () => {
//         return {
//             value: 'select'
//         }
//     };
//
//     let change = event => {
//         this.setState({value: event.target.value});
//     };
//
//     return (
//         <Select className="select-region" onChange={this.change}>
//             <option>Filter by region</option>
//             {
//                 items.items.map(item => {
//                     return(<option key={item} value={item}>{item}</option>)
//                 })
//             }
//         </Select>
//     );
// };

export default Filter;