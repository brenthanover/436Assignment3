import React from 'react';
import '../style/CustomNavbar.css'
import { NavLink } from 'react-router-dom'
import ReactSymbol from './ReactSymbol'
import MongoSymbol from './MongoSymbol'

class CustomNavbar extends React.Component {


    render() {
        return (
            <div id="navbar">
                <div className="grid">
                    <div className="gridblock">
                        <div id="brent">brent hanover</div>
                    </div>
                    <div className="symbolblock">
                        <ReactSymbol/>
                        <MongoSymbol/>
                    </div>
                </div>
                <ul>
                    <li><NavLink to="/Home">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/reviewpage">Reviews</NavLink></li>
                    <li><NavLink to="/assignment">Assignment</NavLink></li>
                </ul>
            </div>
        );
    }
}

export default CustomNavbar;