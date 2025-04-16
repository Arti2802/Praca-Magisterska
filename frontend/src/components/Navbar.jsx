import React from "react";
import { NavItem } from "../components/NavItem";
import { LogOutButton } from "../components/LogOutButton";
import { FaHome } from "react-icons/fa";
import { NotificationsBell } from "./NotificationsBell";

export const Navbar = () => {
    return(
        <>
            <nav className="navbar bg-primary px-2" data-bs-theme="dark">
                <ul className="navbar-nav">
                    <NavItem link={'/'} label={<FaHome className="icon white hovered"/>}/>
                </ul>
                {sessionStorage.getItem('isLogged') === 'true' ?
                <>
                    <div className="d-flex justify-content-end">
                        <NotificationsBell/>
                        <LogOutButton/>
                    </div>
                </>
                :
                <>
                    <div className="d-flex justify-content-center">
                        <div className="mx-1">
                            <button className="btn btn-outline-light"><a className="nav-link" href='/logowanie'>Zaloguj się</a></button>
                        </div>
                        <button className="btn btn-outline-light"><a className="nav-link" href='/rejestracja'>Zarejestruj się</a></button>
                    </div>
                </>}
            </nav>
        </>
    )
}