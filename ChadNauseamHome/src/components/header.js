import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ subtitle, siteTitle }) => (
  <header
    style={{
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        textAlign: 'center',
        marginBottom: "2rem",
        textShadow: "0px 0px 10px #16271f"
      }}
    >
      <h1 style={{
        fontFamily: 'Comic Neue', textTransform: 'lowercase', fontSize: '2.6rem', marginBottom: "1.45rem"

      }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <hr />
      <h1 style={{
        fontFamily: 'Pacifico', fontWeight: 400, fontStyle: 'normal'
      }}>
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
