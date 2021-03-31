import React from "react";
import { Link } from "gatsby";
import headerStyles from "./header.module.scss";
import Logo from '../images/svg/logo.svg';
import AniLink from "gatsby-plugin-transition-link/AniLink";
import TransitionLink from 'gatsby-plugin-transition-link'


const Header = () => (
    <header className={headerStyles.siteHeader}>
        <Logo />
        <nav className={headerStyles.siteNav}>
            <AniLink swipe direction="down" to="/" activeClassName={headerStyles.isActive} exact="true" >Home</AniLink>
            <AniLink swipe direction="down" to="/about" activeClassName={headerStyles.isActive} >About Me</AniLink>
            <Logo />
            <AniLink swipe direction="down" to="/projects" activeClassName={headerStyles.isActive} partiallyActive={true} >Projects</AniLink>
            <AniLink swipe direction="down" to="/contact" activeClassName={headerStyles.isActive} >Contact</AniLink>
        </nav>
    </header>
)

export default Header;