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
import { CSSTransitionGroup } from 'react-transition-group'

import Header from "./header"
import "./layout.css"

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
      <CSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <Header siteTitle={data.site.siteMetadata.title} subtitle={subtitle} />
      </CSSTransitionGroup>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300&family=Pacifico&display=swap" rel="stylesheet"></link>
      </Helmet>
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
