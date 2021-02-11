import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout subtitle="Not Found" description="404">
    <h1>NOT FOUND</h1>
    <p>You tried to access a page that doesn't exist... :/</p>
    <p>
      If you think there should be a page here, please message me on{" "}
      <a href="/twitter">twitter</a> or <a href="/discord">discord</a>.
    </p>
  </Layout>
);

export default NotFoundPage;
