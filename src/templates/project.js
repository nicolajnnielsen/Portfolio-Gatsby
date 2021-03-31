import { graphql } from 'gatsby';
import React, { useState, useEffect } from 'react';
import ReactImageGallery from 'react-image-gallery';
import Layout from '../components/layout';
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
    console.log(project);
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
            <div className={`${projectStyles.portfolioGallery} skeuMorphBg`} >
                <ReactImageGallery items={images} showPlayButton={false} lazyLoad={true} useBrowserFullscreen={false} showIndex={true} showThumbnails={showThumb} onScreenChange={screenModeChange} />
            </div>
            <main className={`${projectStyles.content} skeuMorphBg`} >
                <h1>{project.frontmatter.title} </h1>
                <aside className={projectStyles.info}>
                    <div>
                        <h3>Built with:</h3>
                        <ul className={projectStyles.info__list}>
                            {project.frontmatter.skills.map((skill) => (
                                <li>{skill}</li>
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
