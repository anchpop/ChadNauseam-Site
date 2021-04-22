import * as React from "react";

import "./css/sidenotes.css";

// Can't use a `p` tag even though I'd like to - https://github.com/gatsbyjs/gatsby/issues/29418
const Sn = ({ children }) => (
  <div className="wrapper text-content">{children}</div>
);

export default Sn;
