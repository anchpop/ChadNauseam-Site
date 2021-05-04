import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { CodeBlock, CopyBlock, atomOneDark } from "react-code-blocks";

import Layout from "./layout";
import Sn from "./sn";
import Minisection from "./minisection";
import Note from "./note";
import SubscribeHook from "./subscribe_hook";

import { Link } from "gatsby";

import { InlineMath as Im, BlockMath } from "react-katex";

const CustomCodeBlock = (props) => {
  // if any language selected or javascript by default

  const { className, copy, children } = props;

  const language =
    className?.split("-")[0] === "language"
      ? className.split("-")[1]
      : "javascript";

  const theme = atomOneDark;

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

const shortcodes = {
  Link,
  Layout,
  p: Sn,
  code: (props) => (
    <div className="Block-Code">
      <CustomCodeBlock {...props} />
    </div>
  ),
  Im,
  Note,
  BlockMath,
  SubscribeHook,
  Minisection,
};

export default ({ children }) => (
  <MDXProvider components={shortcodes}>{children}</MDXProvider>
);
