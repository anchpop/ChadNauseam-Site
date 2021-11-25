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
import CustomCodeBlock from "./custom_code_block"
import { StaticImage } from "gatsby-plugin-image"

import { Link } from "gatsby";

import { InlineMath as Im, BlockMath } from "react-katex";



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
