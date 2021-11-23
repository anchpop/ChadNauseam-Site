import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"


export const CenteredImg = ({ src, to }) => {
  const Img = (
    <div className="img-container">
      <img src={src} />
    </div>
  );
  if (to !== undefined) {
    return (
      <a href={to} className="shadowed">
        {Img}
      </a>
    );
  } else {
    return Img;
  }
};

export default Image;
