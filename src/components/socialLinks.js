import React from 'react';
import socialLinksStyles from './socialLinks.module.scss'

import Github from '../images/svg/github.svg';
import LinkedIn from '../images/svg/linkedin.svg';
import Resume from '../images/svg/resume-icon6.svg';



const SocialLinks = () => (
    <aside className={socialLinksStyles.contactLinks}>
        <a href="https://github.com/nicolajnnielsen"><Github /> </a>
        <a href="https://www.linkedin.com/in/nicolaj-norup-nielsen/"><LinkedIn /> </a>
        <a href="https://ln2.sync.com/dl/89c628b50/8y7e58a5-dv7cjzda-h8gf32j4-rbc69686" target="blank"><Resume /> </a>
    </aside>
);

export default SocialLinks;