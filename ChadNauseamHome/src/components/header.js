import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ subtitle, siteTitle, style }) => (
  <header
    style={{
      marginBottom: `1.45rem`,
      ...style
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        textAlign: 'center',
        marginBottom: "2rem",
      }}
    >
      <h1 style={{
        fontFamily: 'Comic Neue', textTransform: 'lowercase', fontSize: '2.6rem', marginBottom: "1.45rem"

      }}>
        <Link
          to="/"
          className="homepageHeader"
        >
          {siteTitle}
        </Link>
      </h1>
      <hr />
      <h1 style={{
        fontFamily: 'Pacifico', fontWeight: 400, fontStyle: 'normal'
      }} className="homepageHeader">
        {subtitle}
      </h1>
    </div>
  </header >
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
