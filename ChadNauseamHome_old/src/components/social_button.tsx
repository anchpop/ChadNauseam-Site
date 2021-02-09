import React from "react"

const SocialButton = ({ text, color, icon, href }) => {
  return (
    <div style={{ backgroundColor: color }} className="shadowed social-button" onClick={() => { window.location = href }}>
      <img src={icon} className="svg-icon" />
      <span className="social-button-text">
        {text}
      </span>
    </div>
  )
}

export default SocialButton