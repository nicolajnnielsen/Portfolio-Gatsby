import React from "react";
import { Link } from "gatsby";
import headerStyles from "./header.module.scss";
import Logo from '../images/svg/logo.svg';


const Header = () => (
    <header className={headerStyles.siteHeader}>
        <Logo />
        <nav className={headerStyles.siteNav}>
            <Link to="/" activeClassName={headerStyles.isActive} exact={true}>Home</Link>
            <Link to="/about" activeClassName={headerStyles.isActive} >About Me</Link>
            <Logo />
            <Link to="/projects" activeClassName={headerStyles.isActive} partiallyActive={true} >Projects</Link>
            <Link to="/contact" activeClassName={headerStyles.isActive} >Contact</Link>
        </nav>
    </header>
)

export default Header;