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
import SocialButton from "../components/social_button"
import Header from "./header"



import discord from "../images/discord.svg"
import twitter from "../images/twitter.svg"
import reddit from "../images/reddit.svg"




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
        <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300&family=Pacifico&display=swap" rel="stylesheet"></link>
      </Helmet>


      <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1) }}>
        {(style) => <>
          <Header siteTitle={data.site.siteMetadata.title} subtitle={subtitle} style={style} />
          <div style={{
            ...style,
          }}
            className="socials-container">
            <SocialButton text="Check the Discord" color="#23272A" icon={discord} href="/discord"></SocialButton>
            <SocialButton text="...Or my Reddit" color="#FF4500" icon={reddit} href="/reddit"></SocialButton>
            <SocialButton text="And my Twitter!" color="#1DA1F2" icon={twitter} href="/twitter"></SocialButton>
          </div>
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
