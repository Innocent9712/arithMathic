import React from 'react'
import logo from "../assets/logo.svg"
import "../styles/Header.css"

function Header() {
    return (
        <header>
            <img src={logo} alt="logo" />
        </header>
    )
}

export default Header
