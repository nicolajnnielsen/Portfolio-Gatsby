import React from "react";
import Header from "./header";
import SocialLinks from "./socialLinks";

import LayoutStyles from './layout.module.scss';
import '../styles/index.scss';

const Layout = ({ children }) => {
    return (
        <div className={LayoutStyles.pageWrapper}>
            <SkipNav />
            <Header />
            {children}
            <SocialLinks />
        </div>
    )
}

const SkipNav = () => {
    return (
        <a id="skipNavLink" href="#content" className={LayoutStyles.link} >Skip to main content</a>
    )
}

export default Layout;