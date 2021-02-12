import React from "react";

import { Link } from "gatsby";
import { transform } from "lodash";
import PropTypes from "prop-types";

const Header = ({ subtitle, siteTitle, style }) => (
  <header
    style={{
      marginBottom: `1.45rem`,
      ...style,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        textAlign: "center",
        marginBottom: "2rem",
      }}
    >
      <h1
        style={{
          fontFamily: "Pacifico",
          fontWeight: 400,
          fontStyle: "normal",
          fontSize: "2.6rem",
          marginBottom: "1.45rem",
        }}
      >
        {subtitle}
      </h1>
      <hr />
      <h1
        style={{
          fontFamily: "Comic Neue",
          textTransform: "lowercase",
        }}
        className="homepageHeader"
      >
        <Link to="/" className="homepageHeader">
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
