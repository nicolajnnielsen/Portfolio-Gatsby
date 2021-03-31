import { graphql } from 'gatsby';
import React from 'react'
import ProjectCard from '../components/projectCard';
import Seo from '../components/seo';

import projectsStyles from './projects.module.scss';

export const query = graphql`
        query ProjectsPageQuery {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            title
                            shortTitle
                            description
                            coverImage {
                                childImageSharp {
                                    fluid(maxWidth: 900) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `

const Projects = ({data}) => {
    // console.log(data);
    // const data = useStaticQuery(graphql`
    //     query {
    //         allMarkdownRemark {
    //             edges {
    //                 node {
    //                     frontmatter {
    //                         title
    //                         description
    //                         coverImage {
    //                             childImageSharp {
    //                                 fluid {
    //                                     ...GatsbyImageSharpFluid
    //                                 }
    //                             }
    //                         }
    //                     }
    //                     fields {
    //                         slug
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // `)

    return (
        <>
            <Seo title="Projects" />
            <main className={`${projectsStyles.portfolio}`}>
                {data.allMarkdownRemark.edges.map(({ node: { frontmatter: { title, shortTitle, coverImage: img, description }, fields: { slug } } }, index) => {
                    return (
                        <ProjectCard key={index} title={shortTitle ? shortTitle : title} img={img} description={description} slug={slug} frontpage={false} />
                    )
                }) }
            </main>
        </>
    )
}

export default Projects;