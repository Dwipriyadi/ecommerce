import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../logo.svg';

class Navbar extends Component {
    render() {
        return (
           <nav className="navbar navbar-expand-sm bg-primary navbar-dark px-sm-5">
           <Link to="/">
                <img src={logo} alt="store" className="navbar-brand" />
            </Link>
            <ul className="navbar-nav align-items-center">
                <li className="nav-item-ml-5">
                    <Link to="/" className="nav-link">
                    Product
                    </Link>
                </li>
            </ul>
            <Link to="/cart" className="ml-auto">
                <ButtonContainer>
                <span className="mr-2">
                    <i className="fa fa-cart-plus " />
                    </span>
                     MY CART
                </ButtonContainer>
            </Link>
           </nav>
        );
    }
}

export default Navbar;

    const ButtonContainer = styled.button`
        text-transform:capitalize;
        font-size:1.4rem;
        background:transparent;
        color: var(--mainWhite);
        &:hover {
            background:var(--lightBlue);
            color:var(--mainBlue);
        }
    `;