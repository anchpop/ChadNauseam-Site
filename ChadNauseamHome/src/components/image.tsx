import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"


export const CenteredImg = ({ src, to, style }) => {
  const Img = (
    <div className="img-container">
      <img src={src} style={style} />
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

