import React from "react"

const SocialButton = ({ text, color, icon, href }) => {
  return (
    <div style={{ backgroundColor: color }} className="shadowed socialButton" onClick={() => { window.location = href }}>
      <img src={icon} className="svg-icon" style={{ marginRight: "4px" }} />
      <span style={{ fontFamily: "Comic Neue", color: "white" }}>
        {text}
      </span>
    </div>
  )
}

export default SocialButton