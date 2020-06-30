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

import Header from "./header"
import "./css/water.css"
import "./css/custom.css"

const Layout = ({ subtitle, children }) => {
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
      <Helmet>
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
