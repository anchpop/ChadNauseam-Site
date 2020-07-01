/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"
import { Motion, spring } from 'react-motion';
import SEO from "../components/seo"
import favicon from '../images/favicon.ico'

import Header from "./header"
import "./css/vars.css"
import "./css/water.css"
import "./css/custom.css"

const Layout = ({ subtitle, description, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <SEO title={subtitle} description={description} />
      <Helmet>
        <link rel="icon" href={favicon} />
        <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300&family=Pacifico&display=swap" rel="stylesheet"></link>
      </Helmet>

      <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1) }}>
        {(style) => <>
          <Header siteTitle={data.site.siteMetadata.title} subtitle={subtitle} style={style} />
          <main style={style}>{children}</main>
        </>}
      </Motion>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
