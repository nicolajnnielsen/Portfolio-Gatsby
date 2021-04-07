import React, { useEffect, useState } from "react";
import headerStyles from "./header.module.scss";
import Logo from '../images/svg/logo.svg';
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { useLocation } from "@reach/router"


const Header = () => {
    const [hasParam, setHasParam] = useState(false);
    const { pathname } = useLocation();
    useEffect(() => {
        setHasParam(pathname.match(/[/]/g || []).length > 1 ? true : false);
    }, [pathname])
    return (
        <header className={headerStyles.siteHeader}>
            <Logo />
            <nav className={headerStyles.siteNav}>
                <AniLink swipe direction="right" entryOffset={90} to="/" activeClassName={headerStyles.isActive} exact="true" >Home</AniLink>
                <AniLink swipe direction={pathname === "/" ? "left" : "right"} entryOffset={90} to="/about" activeClassName={headerStyles.isActive} >About Me</AniLink>
                <Logo />
                <AniLink swipe direction={pathname === "/" || pathname === "/about" ? "left" : "right"} entryOffset={90} to="/projects" activeClassName={headerStyles.isActive} partiallyActive={true} >Projects</AniLink>
                <AniLink swipe direction="left" to="/contact" entryOffset={90} activeClassName={headerStyles.isActive} >Contact</AniLink>
            </nav>
        </header>
    )
}

export default Header;