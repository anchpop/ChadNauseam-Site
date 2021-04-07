import React from "react";
import { Link } from "gatsby";
import { CopyBlock, dracula } from "react-code-blocks";

import Layout from "../../components/layout";

import Sn from "../../components/sn";

import messy_pr from "../../images/coding/screenshots/bevy_cheatbook_pr.png";

const IndexPage = () => (
  <Layout subtitle="General Info" description="Your source for all things Chad">
    <Sn>
      So you want to contribute your change to your favorite open-source
      software.
    </Sn>
    <Sn>
      Seems pretty easy. Fork the project on github, hack hack hack, push your
      changes to your branch, and PR. Couldn't be simpler. Or could it?
    </Sn>
    <Sn>
      Well, if your experience with open source is anything like mine, the
      maintainers will have some changes they'd like you to make. You forgot to
      run the formatter, or they would prefer a different order of function
      parameters, etc. Or, you just realize additional changes you should have
      made. Soon, your PR looks like this:
    </Sn>
    <img src={messy_pr} className="invert-if-light" />
    <Sn>
      How messy! Here's how to fix it. Assuming you have the upstream as a
      remote named `upstream` and want to merge your changes with the branch
      `main`:
    </Sn>
  </Layout>
);

export default IndexPage;
