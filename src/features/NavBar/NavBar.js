import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function NavBar() {
    return (
        <NavStyled>
            <LinkStyled to="/">go ton home page</LinkStyled>
            <LinkStyled to="/counter">go ton counter page</LinkStyled>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 14px;
    background-color: #dcdbf9;
`

const LinkStyled = styled(Link)`
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
        background-color: #100e4e;
    }
`

export default NavBar
