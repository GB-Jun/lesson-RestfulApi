import React, { useContext } from "react";
import { Link } from "react-router-dom";
import themeContext, { themes } from "./ThemeContext";
import authContext from "./AuthContext";

export default function Navbar() {
    const { name, setTheme } = useContext(themeContext);
    const { authorized, account, logout } = useContext(authContext);

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#/">
                    Navbar
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/list-auth">
                                List-auth
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/my-draw">
                                My-draw
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/my-draw2">
                                My-draw2
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#/"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                {Object.keys(themes).map((n, i) => {
                                    return (
                                        <li
                                            className="dropdown-item"
                                            key={i}
                                            onClick={() => setTheme(themes[n])}
                                        >
                                            <button className="btn">
                                                {n +
                                                    (n === name ? " used" : "")}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        {authorized ? (
                            <>
                                <li className="nav-item d-flex">
                                    <p>歡迎您回來 {account}/</p>
                                </li>
                                <li>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => {
                                            logout();
                                        }}
                                    >
                                        登出
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    登入
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
