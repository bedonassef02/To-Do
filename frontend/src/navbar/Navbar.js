import React from 'react';
import './Navbar.css';
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";

const Navbar = () => {
    const [cookies] = useCookies(['user']);

    const isLoggedIn = !!cookies.user; // Check if "user" cookie exists

    return (
        <nav className="navbar">
            <Link className="logo" to={"/"}>To-Do</Link>
            <ul className="nav-links">
                <Link className="nav-link" to={"/"}>Home</Link>
                {isLoggedIn ? (
                    <>
                        <Link className="nav-link" to={"/tasks"}>Tasks</Link>
                        <Link className="nav-link" to={"/notes"}>Notes</Link>
                    </>
                ) : (
                    <React.Fragment>
                        <Link className="nav-link" to={"/login"}>Login</Link>
                        <Link className="nav-link" to={"/register"}>Register</Link>
                    </React.Fragment>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
