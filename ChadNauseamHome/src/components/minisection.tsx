import * as React from "react";

import Sn from "./sn";

import "./css/minisection.css";

export default ({ heading, children }) => (
  <Sn>
    {heading}
    <div className="minisection-content">{children}</div>
  </Sn>
);
