import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header className="app-header">
            <h1 className="app-title">Welcome</h1>
            <ul className="menu">
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/moviesearch'>Search movies</NavLink>
                </li>
            </ul>
        </header>);
}