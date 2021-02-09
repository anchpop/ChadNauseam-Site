import * as React from "react"

import Tippy from "@tippyjs/react"

import ThemeContext from "../utils/themeContext"

const Note = ({ index, children }) => {
  const { smallScreen } = React.useContext(ThemeContext)

  const trigger = (
    <Tippy
      content={children}
      ignoreAttributes={true}
      interactive={true}
      trigger="click"
      theme="light-border"
      placement="bottom"
      animation="shift-away"
      maxWidth={354}
    >
      <button className="sn-button">{index}</button>
    </Tippy>
  )

  return smallScreen ? trigger : <div className="extract">{children}</div>
}

export default Note
