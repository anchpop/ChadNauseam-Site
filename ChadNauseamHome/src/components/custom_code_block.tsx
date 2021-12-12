import React from "react";
import { CodeBlock, CopyBlock, dracula, github } from "react-code-blocks";
import ThemeContext from "../utils/themeContext";
import "@fontsource/fira-code"


const CustomCodeBlock = (props) => {
  const { lightTheme } = React.useContext(ThemeContext);
  // if any language selected or javascript by default

  const { className, copy, children } = props;

  const split_class = className?.split("-")
  console.log(className, split_class);
  const language =
    split_class && split_class[0] === "language"
      ? split_class[1]
      : "javascript";

  const showLineNumbers = split_class !== undefined ?
    split_class[0] === "language" && split_class.length == 3
      ? split_class[2] !== "nolines" : true : true



  const theme = lightTheme ? github : dracula;


  return copy ? (
    <CopyBlock
      text={children}
      language={language}
      theme={theme}
      showLineNumbers={showLineNumbers}
      wrapLines
      codeBlock
    />
  ) : (
    <CodeBlock showLineNumbers={showLineNumbers} text={children} language={language} theme={theme} wrapLines />
  );
};

export default CustomCodeBlock;
