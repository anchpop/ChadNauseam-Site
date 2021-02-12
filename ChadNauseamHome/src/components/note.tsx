import * as React from "react";

import Tippy from "@tippyjs/react";

import ThemeContext from "../utils/themeContext";

const Note: React.FC<{ numbered?: boolean }> = ({ numbered, children }) => {
  const { smallScreen } = React.useContext(ThemeContext);

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
      <button className="sidenote-button">
        <span className="sidenote-button-number"></span>
      </button>
    </Tippy>
  );

  return smallScreen ? (
    trigger
  ) : (
    <>
      {numbered ? <span className="sidenote-number"></span> : <></>}
      <span className={numbered ? "sidenote" : "marginnote"}>{children}</span>
    </>
  );
};

export default Note;
