import React from "react";
import Header from "./header";
import SocialLinks from "./socialLinks";

import LayoutStyles from './layout.module.scss';
import '../styles/index.scss';
import SkipNav from "./SkipNav";

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

export default Layout;