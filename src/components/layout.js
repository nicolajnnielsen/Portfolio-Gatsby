import React from "react";
import Header from "./header";
import SocialLinks from "./socialLinks";

import LayoutStyles from './layout.module.scss';
import '../styles/index.scss';

const Layout = ({ children }) => {
    return (
        <div className={LayoutStyles.pageWrapper}>
            <Header />
            {children}
            <SocialLinks />
        </div>
    )
}

export default Layout;