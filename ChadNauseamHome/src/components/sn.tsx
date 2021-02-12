import * as React from "react";

import "./css/sidenotes.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/animations/shift-away.css";

// Can't use a `p` tag even though I'd like to - https://github.com/gatsbyjs/gatsby/issues/29418
const Sn = ({ children }) => (
  <div className="wrapper text-content">{children}</div>
);

export default Sn;
