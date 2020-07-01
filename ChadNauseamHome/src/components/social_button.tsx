import React from "react"

const SocialButton = ({ text, color, icon, href }) => {
  return (
    <div style={{ backgroundColor: color }} className="shadowed social-button" onClick={() => { window.location = href }}>
      <img src={icon} className="svg-icon" />
      <span style={{ fontFamily: "Comic Neue", color: "white", marginLeft: 4 }} className="social-button-text">
        {text}
      </span>
    </div>
  )
}

export default SocialButton