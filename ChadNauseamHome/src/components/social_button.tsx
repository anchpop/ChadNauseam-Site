import React from "react";

const SocialButton = ({ text, color, icon, href }) => {
  return (
    <a href={href}>
      <div style={{ backgroundColor: color }} className="social-button">
        <img src={icon} className="svg-icon" />
        <span className="social-button-text">{text}</span>
      </div>
    </a>
  );
};

export default SocialButton;
