import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import "../components/css/frontpage.css";

const posts = [
  {
    section: "programming",
    posts: [
      {
        title: "Why a programmer union can save open source",
        link: "/economics/why-a-programmer-union/"
      }
    ]
  },
  {
    section: "politics",
    posts: [
      {
        title: "Political reasoning style quiz",
        link: "/reasoning-quiz"
      }
    ]
  }
]

const IndexPage = () => (
  <Layout subtitle="General Info" description="Your source for all things Chad">
    <p>
      If you'd like to talk to me, message me on <a href="/twitter">Twitter</a>,
      or join <a href="/discord">my Discord</a>!
    </p>
    <ol className="Topics">
      {
        posts.map((category) =>
          <li className="Topic">
            <section>
              <h1 data-shadow={category.section} className="TopicHeading">{category.section}</h1>
              <ol className="Posts">
                {
                  category.posts.map((post) => (
                    <Link to={post.link} className="Post">
                      <li>
                        {post.title}
                      </li>
                    </Link>
                  ))
                }
              </ol>
            </section>
          </li>)
      }
    </ol>
    <p> I think <Link to="/economics/why-a-programmer-union/">a programmer union can save open-source</Link>. Also, check out my <Link to="/reasoning-quiz">Political Reasoning Style Quiz</Link>!
    </p>
    <hr />


  </Layout>
);

export default IndexPage;
