import React from 'react'
import styles from './SkipNav.module.scss';

const SkipNav = () => {
    return (
        <a id="skipNavLink" href="#content" className={styles.link} >Skip to main content</a>
    )
}

export default SkipNav
