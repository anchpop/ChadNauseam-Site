/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { trim } from "lodash";

import { Link, useStaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import { Motion, spring } from "react-motion";
import { useMediaQuery } from "react-responsive";

import SEO from "../components/seo";
import SocialButton from "../components/social_button";
import Header from "./header";

import ThemeContext from "../utils/themeContext";

import discord from "../images/discord.svg";
import twitter from "../images/twitter.svg";
import reddit from "../images/reddit.svg";

import { Series, seriesInfo } from "../utils/seriesInfo";

import { Location } from "@reach/router";

import "./css/vars.css";
import "./css/water.css";
import "./css/custom.css";

const Layout: React.FC<{ subtitle: string; description: string }> = ({
  subtitle,
  description,
  children,
}) => {
  // Try to avoid using these.
  // You want to do as much in CSS as possible because these are obviously not accessible during server-side rendering
  const smallScreen = useMediaQuery({ maxWidth: 1400 });
  const lightTheme = useMediaQuery({ query: "(prefers-color-scheme: light)" });

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <SEO title={subtitle} description={description} />
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300&family=Pacifico&family=Source+Sans+Pro&display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>

      <Header
        siteTitle={data.site.siteMetadata.title}
        subtitle={subtitle}
        style={{}}
      />
      <div className="total-content">

        <ThemeContext.Provider
          value={{
            lightTheme,
            smallScreen,
          }}
        >
          <main className="main-content fadeIn">
            {children}
          </main>
        </ThemeContext.Provider>

        <div
          className="socials-container fadeIn"
        >
          <SocialButton
            text="My Discord"
            color="#23272A"
            icon={discord}
            href="/discord"
          ></SocialButton>
          {/*<SocialButton
          text="...Or my Reddit"
          color="#FF4500"
          icon={reddit}
          href="/reddit"
        ></SocialButton>*/}
          <SocialButton
            text="My Twitter"
            color="#1DA1F2"
            icon={twitter}
            href="/twitter"
          ></SocialButton>
        </div>
      </div>
    </>
  );
};

/** Grabs series info from src/utils/seriesInfo.tsx, matches that up to the current path (automatically grabbed with the Location api), and adds pagination stuff automatically. */
export const SeriesLayout: React.FC<{}> = ({ children }) => {
  return (
    <Location>
      {(locationProps) => {
        const splitPath = trim(locationProps.location.pathname, "/").split("/");
        const parentPath = splitPath.slice(0, splitPath.length - 1).join("/");
        const episode = parseInt(splitPath[splitPath.length - 1]);

        const info = seriesInfo[parentPath];
        const { title, description } = info.episodes[episode];
        const previous = episode > 0 ? info.episodes[episode - 1] : undefined;
        const next =
          episode < info.episodes.length - 1
            ? info.episodes[episode + 1]
            : undefined;

        return (
          <Layout
            subtitle={`${info.seriesTitle} - ${title}`}
            description={description}
          >
            <article>{children}</article>
            {previous === undefined && next === undefined ? (
              <></>
            ) : (
              <div className="page-navigation-footer">
                <div>
                  {previous ? (
                    <Link
                      to={`/${parentPath}/${episode - 1}`}
                      className="navigate-left"
                    >
                      {previous.title}
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  {next ? (
                    <Link
                      to={`/${parentPath}/${episode + 1}`}
                      className="navigate-right"
                    >
                      {next.title}
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
          </Layout>
        );
      }}
    </Location>
  );
};

export default Layout;
