import * as React from "react";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/animations/shift-away.css";
import ThemeContext from "../utils/themeContext";

const Tip = ({ content, children, fancy }) => {
  const { smallScreen } = React.useContext(ThemeContext);

  return (
    <Tippy
      content={content}
      theme={fancy ? "gradient-tip" : ""}
      placement="bottom"
      animation="shift-away"
      arrow={false}
      {...(smallScreen ? { trigger: "click" } : {})}
    >
      {fancy ? (
        <button className="always subtle">{children}</button>
      ) : (
        <span>{children}</span>
      )}
    </Tippy>
  );
};

export default Tip;

export const MusicTheoryTip = () =>
  Tip({
    children: "music theory",
    content: "The study of why some sounds sound musical and others don't.",
    fancy: true,
  });
