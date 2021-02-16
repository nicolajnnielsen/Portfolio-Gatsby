import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';

import projectStyles from './project.module.scss';

export const query = graphql`
    query ($slug: String!) {
        markdownRemark(fields: {slug: {eq: $slug}}) {
            frontmatter {
                title
                skills
                link
                hightlight
                gitLink
            }
            html
        }
    }
`;

const Project = ({data}) => {
    const project = data.markdownRemark;
    console.log(project);
    return (
        <Layout>
            {/* <div className="portfolio-gallery content-area__1and2 skeuMorphBg" initial="initial" animate="enter" exit="exit" variants={PageVariant} transition={PageTransition}>
                <ReactImageGallery items={images} showPlayButton={false} lazyLoad={true} useBrowserFullscreen={false} showIndex={true} showThumbnails={showThumb} onErrorImageURL={ErrorImg} onScreenChange={screenModeChange} />
            </div> */}
            <main className={`${projectStyles.content} skeuMorphBg`} >
                <h1>{project.title} </h1>
                <aside className={projectStyles.info}>
                    <div>
                        <h3>Built with:</h3>
                        <ul className={projectStyles.info__list}>
                            {project.frontmatter.skills.map((skill) => (
                                <li>{skill}</li>
                            ))}
                        </ul>
                        {project.frontmatter.link && <a href={project.frontmatter.link}>Live Demo</a>}
                        {project.frontmatter.gitLink && <a href={project.frontmatter.gitLink}>View Code</a>}
                    </div>
                </aside>
                <div className={projectStyles.text} dangerouslySetInnerHTML={{__html: project.html}} ></div>
            </main>
        </Layout>
    )
}

export default Project
