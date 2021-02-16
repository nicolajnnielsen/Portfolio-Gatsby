import { graphql, useStaticQuery } from 'gatsby';
import React from 'react'
import Layout from '../components/layout'
import ProjectCard from '../components/projectCard';

import projectsStyles from './projects.module.scss';

export const query = graphql`
        query ProjectsPageQuery {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            title
                            description
                            coverImage {
                                childImageSharp {
                                    fluid {
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
    console.log(data);
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
        <Layout>
            <main className={`${projectsStyles.portfolio}`}>
                {data.allMarkdownRemark.edges.map(({ node: { frontmatter: { title, coverImage: img, description }, fields: { slug } } }, index) => {
                    return (
                        <ProjectCard key={index} title={title} img={img} description={description} slug={slug} frontpage={false} />
                    )
                }) }
            </main>
        </Layout>
    )
}

export default Projects;
