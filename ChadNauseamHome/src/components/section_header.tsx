import React from "react";

const FlexHr = (
  <div
    style={{
      display: "flex",
      flex: 1,
    }}
  >
    <hr style={{ flexGrow: 1 }} />
  </div>
);

const SectionHeader = ({ children }) => (
  <div className="section-header-container">
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {FlexHr}
      <h1 className="section-header">{children}</h1>
      {FlexHr}
    </div>
  </div>
);

export default SectionHeader;
