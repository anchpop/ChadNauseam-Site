import React from "react";
import { CodeBlock, CopyBlock, dracula, github } from "react-code-blocks";
import ThemeContext from "../utils/themeContext";

const CustomCodeBlock = (props) => {
  const { lightTheme } = React.useContext(ThemeContext);
  // if any language selected or javascript by default

  const { className, copy, children } = props;

  const language =
    className?.split("-")[0] === "language"
      ? className.split("-")[1]
      : "javascript";


  const theme = lightTheme ? github : dracula;
  

  return copy ? (
    <CopyBlock
      text={children}
      language={language}
      theme={theme}
      wrapLines
      codeBlock
    />
  ) : (
    <CodeBlock text={children} language={language} theme={theme} wrapLines />
  );
};

export default CustomCodeBlock;
