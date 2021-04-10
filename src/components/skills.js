import React from 'react';
import skillsStyles from './skills.module.scss';

const Skill = (props) => (
    // eslint-disable-next-line
    <article aria-labelledby={`skill-${props.id}`} onClick={(e) => { props.toggleActive(props.id) }} onKeyDown={(e) => { if (e.key === 'Enter') props.toggleActive(props.id) }} tabIndex="0" className={`${skillsStyles.skill} ${props.active ? skillsStyles.clsActive : ''}`}>
        <span className={skillsStyles.skill__btn}>{props.id} </span>
        <h2 id={`skill-${props.id}`} className={skillsStyles.skill__title}>{props.title}</h2>
        <p className={skillsStyles.skill__text}>{props.text}</p>
    </article>

);

export default Skill;
