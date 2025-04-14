import { useLocation, NavLink } from "react-router-dom";
import React, { useState } from 'react';
import SearchBox from './SearchBox';

export default function Header({ setMovieElements }) {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const location = useLocation();

    function toggleClass(e) {
        e.preventDefault();
        if (!showMobileMenu) {
            setShowMobileMenu(true);
        }
        else {
            setShowMobileMenu(false);
        }
    }
    return (
        <header className="app-header">
            <h1 className="app-title">Welcome</h1>
            <div className={showMobileMenu ? 'menu responsive' : 'menu'}>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/moviesearch'>Search movies</NavLink>
                <a href="void(0);" onClick={toggleClass} className="icon icon-padding-bottom">
                    <div className="hamburger-menu">
                        <div className="hamburger-bar"></div>
                        <div className="hamburger-bar"></div>
                        <div className="hamburger-bar"></div>
                    </div>
                </a>
            </div>
            {'/moviesearch' === location.pathname ? (
                <SearchBox setMovieElements={setMovieElements} />
            ) : null}
        </header>);
}