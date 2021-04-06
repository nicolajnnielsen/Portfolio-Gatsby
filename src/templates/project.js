import { graphql } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import React, { useState, useEffect } from 'react';
import ReactImageGallery from 'react-image-gallery';
import Seo from '../components/seo';

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
                images {
                    img {
                        childImageSharp {
                            fixed(width: 95) {
                                src
                            }
                            fluid(maxHeight: 750, quality: 100) {
                                srcSet
                                sizes
                                originalImg
                                src
                            }
                        }
                    }
                    description
                }
            }
            html
        }
    }
`;

const Project = ({ data }) => {
    const [showThumb, setShowThumb] = useState(true);
    const project = data.markdownRemark;
    const images = project.frontmatter.images.map((image, i) => {
        return {
            original: image.img.childImageSharp.fluid.originalImg,
            originalAlt: image.description,
            thumbnail: image.img.childImageSharp.fixed.src,
            thumbnailAlt: image.description,
            description: image.description,
            srcSet: image.img.childImageSharp.fluid.srcSet,
            sizes: image.img.childImageSharp.fluid.sizes
        }
    })

    const screenModeChange = (full) => {
        setShowThumb(prevState => !prevState);
        if (full) document.body.classList.add('fullScreen');
        else document.body.classList.remove('fullScreen');
    }

    useEffect(() => {
        return () => {
            document.body.classList.remove("fullScreen");
        }
    }, [])
    
    return (
        <>
            <Seo title={`${project.frontmatter.title} - Project`} />
            <nav className={projectStyles.backLink}><AniLink cover direction="up" bg="#171717" to="/projects" title="Back to projects"><svg focusable="false" aria-label="Back to projects" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"></path></svg></AniLink> </nav>
            <div className={`${projectStyles.portfolioGallery} skeuMorphBg`} >
                <ReactImageGallery items={images} showPlayButton={false} lazyLoad={true} useBrowserFullscreen={false} showIndex={true} showThumbnails={showThumb} onScreenChange={screenModeChange} />
            </div>
            <main className={`${projectStyles.content} skeuMorphBg`} >
                <h1>{project.frontmatter.title} </h1>
                <aside className={projectStyles.info}>
                    <div>
                        <h3>Built with:</h3>
                        <ul className={projectStyles.info__list}>
                            {project.frontmatter.skills.map((skill, i) => (
                                <li key={i}>{skill}</li>
                            ))}
                        </ul>
                        {project.frontmatter.link && <a href={project.frontmatter.link}>View Demo</a>}
                        {project.frontmatter.gitLink && <a href={project.frontmatter.gitLink}>View Code</a>}
                    </div>
                </aside>
                <article className={projectStyles.text} dangerouslySetInnerHTML={{__html: project.html}} ></article>
            </main>
        </>
    )
}

export default Project
