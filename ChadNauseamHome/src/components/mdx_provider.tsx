import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { CodeBlock, CopyBlock, atomOneDark } from "react-code-blocks";
import { Graphviz } from "graphviz-react";

import Layout from "./layout";
import Sn from "./sn";
import Minisection from "./minisection";
import Note from "./note";
import SubscribeHook from "./subscribe_hook";
import SectionHeader from "./section_header";
import _, { CenteredImg } from "./image";
import { StaticImage } from "gatsby-plugin-image"

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
  h1: SectionHeader,
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
  CenteredImg,
  StaticImage,
  Graphviz: ({ dot, options }) => (
    <Graphviz
      dot={dot}
      className="graphviz"
      options={{ width: "100%", height: "auto", ...options }}
    />
  ),
};

export default ({ children }) => (
  <MDXProvider components={shortcodes}>{children}</MDXProvider>
);
