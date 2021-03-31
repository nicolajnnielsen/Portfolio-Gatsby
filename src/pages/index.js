import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import ProjectCard from "../components/projectCard";
import Seo from "../components/seo";

import indexStyles from "./index.module.scss";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark (filter: {frontmatter: {hightlight: {eq: true}}}, limit: 3) {
                edges {
                    node {
                        frontmatter {
                            title
                            shortTitle
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
    `);
  return (
    <>
      <Seo title="Welcome" />
      <main className={indexStyles.frontpageIntro} >
        <h1>Nicolaj N. Nielsen</h1>
        <h2>Frontend Developer...</h2>
        <h3>...With a <span className={indexStyles.highlight} >hunger for learning</span>, a focus on using <span className={indexStyles.highlight}>straightforward code</span> to build <span className="highlight">user friendly and intuitive</span> interfaces. </h3>
      </main>
      <section aria-labelledby="header-projectHighlights" className={`${indexStyles.portfolio} ${indexStyles.frontpagePortfolio} skeuMorphBg`} >
        <h2 id="header-projectHighlights" className={indexStyles.header}>Project Highlights</h2>
        {data.allMarkdownRemark.edges.map((({ node: { frontmatter: { title, shortTitle, coverImage: img, description }, fields: { slug } } }, index) => {
          return (
            <ProjectCard key={index} title={shortTitle ? shortTitle : title} img={img} description={description} slug={slug} frontpage={true} />
          )
        }))}
      </section>
    </>
  )
}

export default IndexPage
