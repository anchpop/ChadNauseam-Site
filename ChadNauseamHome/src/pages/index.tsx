import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import "../components/css/frontpage.css";

const posts = [
  {
    section: "economics",
    posts: [
      {
        title: "Improving the US financial system",
        link: "/economics/solving-macro/"
      }, 
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
      Your source for all things chad :p
    </p>
    <ol className="Topics">
      {
        posts.map((category) =>
          <li className="Topic">
            <section>
              <h2 data-shadow={category.section} className="TopicHeading">{category.section}</h2>
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
    <iframe src="https://discord.com/widget?id=563769642699587593&theme=dark" width="350" height="500" allowTransparency={true} frameBorder={0} sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" style={{margin: "auto"}}></iframe>


  </Layout>
);

export default IndexPage;
