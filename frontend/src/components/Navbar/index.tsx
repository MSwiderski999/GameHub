import React, { ReactElement } from 'react'
import NavRoutes from './navRoutes'
import './navbar.scss'

interface NavbarProps{
    loggedIn: boolean
}

export default function Navbar(props : NavbarProps){
    return (
        <div id="app-nav">
            <div id="app-brand">
                GameHub
            </div>
                <NavRoutes loggedIn={props.loggedIn}></NavRoutes>
        </div>
    )
}