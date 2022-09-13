import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import "../components/css/frontpage.css";

const posts = [
  {
    section: "Coding",
    posts: [
      { title: "How side effects work in FP", link: "/coding/random/how-side-effects-work-in-fp/" },
      // { title: "Git-branchless is totally cracked", link: "/coding/random/git-branchless-cracked/" },
      { title: "I learned to love testing game code", link: "/coding/gamedev/automated-testing-in-bevy" },
      { title: "Decentralized version control, centralized version management", link: "/coding/random/thinking-about-version-control" },
      { title: "A hacker's case for cryptocurrency", link: "/coding/cryptocurrency/a-hackers-case-for-crypto/" }
    ]
  },
  {
    section: "Economics",
    posts: [
      {
        title: "Improving the US financial system",
        link: "/economics/solving-macro/"
      },
      {
        title: "Why a programmer's association can save open source",
        link: "/economics/why-a-programmer-union/"
      }
    ]
  },
  {
    section: "Advice",
    posts: [
      { title: "focusing", link: "/advice/focusing" },
    ]
  },
  {
    section: "Politics",
    posts: [
      {
        title: "Political reasoning style quiz",
        link: "/reasoning-quiz"
      }
    ]
  }
]

const IndexPage = () => (
  <Layout subtitle="General Info" description="Your source for all things Chad" nodisclaimer>
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


  </Layout>
);

export default IndexPage;
