import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { CodeBlock, CopyBlock, dracula } from "react-code-blocks";

import Layout from "./layout";
import Sn from "./sn";
import { Link } from "gatsby";

const CustomCodeBlock = (props) => {
  // if any language selected or javascript by default

  const { className, copy, children } = props;

  const language =
    className?.split("-")[0] === "language"
      ? className.split("-")[1]
      : "javascript";

  return copy ? (
    <CopyBlock
      text={children}
      language={language}
      theme={dracula}
      wrapLines
      codeBlock
    />
  ) : (
    <CodeBlock text={children} language={language} theme={dracula} wrapLines />
  );
};

const shortcodes = {
  Link,
  Layout,
  p: Sn,
  code: (props) => (
    <div className="Block-Code">
      <CustomCodeBlock {...props} />
    </div>
  ),
};

export default ({ children }) => (
  <MDXProvider components={shortcodes}>{children}</MDXProvider>
);
