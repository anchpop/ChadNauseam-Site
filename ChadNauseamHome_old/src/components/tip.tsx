import * as React from "react"

import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
import "tippy.js/themes/light-border.css"
import "tippy.js/animations/shift-away.css"

const Tip = ({ content, children }) => (
  <Tippy content={content}>
    <span>{children}</span>
  </Tippy>
)

export default Tip
