import React from 'react'
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const query = graphql`
    query SEO {
        site {
            siteMetadata {
                defaultTitle: title
                titleTemplate
                defaultDescription: description
                siteUrl: url
            }
        }
    }
`

const Seo = ({ title, description, lang }) => {
    const { pathname } = useLocation();
    const { site } = useStaticQuery(query);

    const {
        defaultTitle,
        titleTemplate,
        defaultDescription,
        siteUrl,
    } = site.siteMetadata;

    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        url: `${siteUrl}${pathname}`,
    }

    return (
        <Helmet titleTemplate={titleTemplate} title={seo.title} htmlAttributes={{ lang }}>
            <meta name="description" content={seo.description} />
            {seo.url && <meta property="og:url" content={seo.url} />}
            {seo.title && <meta name="twitter:title" content={seo.title} />}
            {seo.description && (
                <meta name="twitter:description" content={seo.description} />
            )}
        </Helmet>
    )
}

Seo.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    lang: PropTypes.string,
}

Seo.defaultProps = {
    title: "",
    description: "",
    lang: 'en',
}

export default Seo;
