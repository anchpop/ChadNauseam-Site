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
      <h1
        style={{
          filter: "drop-shadow(0px 0px 10px)",
          paddingLeft: "1em",
          paddingRight: "1em",
          display: "flex",
          flex: 7,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {children}
      </h1>
      {FlexHr}
    </div>
  </div>
);

export default SectionHeader;
