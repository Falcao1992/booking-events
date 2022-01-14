import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

function NavBar() {
    return (
        <NavStyled>
            <NavLinkStyled exact to="/" activeClassName="selected">
                home page
            </NavLinkStyled>
            <NavLinkStyled to="/counter" activeClassName="selected">
                counter page
            </NavLinkStyled>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 14px;
    background-color: #dcdbf9;

    .selected {
        background-color: #1b1a71;
    }
`

const NavLinkStyled = styled(NavLink)`
    text-decoration: none;
    text-transform: capitalize;
    background-color: #5e5af7;
    color: aliceblue;
    font-weight: 600;
    margin: 0 7px;
    padding: 3.5px 7px;
    border-radius: 8px;
    transition: background-color .3s ease-in-out;

    &:hover { {
      background-color: #1b1a71;
    }
`

export default NavBar
