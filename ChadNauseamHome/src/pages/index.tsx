import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";

const IndexPage = () => (
  <Layout subtitle="General Info" description="Your source for all things Chad">
    <p> I think <Link to="/economics/why-a-programmer-union/">a programmer union can save open-source</Link>. Also, check out my <Link to="/reasoning-quiz">Political Reasoning Style Quiz</Link>!
    </p>
    <hr />
    <p>
      If you'd like to talk to me, message me on <a href="/twitter">Twitter</a>,
      or join <a href="/discord">my Discord</a>!
    </p>
  </Layout>
);

export default IndexPage;
