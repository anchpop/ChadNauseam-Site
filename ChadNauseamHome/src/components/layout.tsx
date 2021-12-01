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

const Layout: React.FC<{ subtitle: string; description: string, andre?: boolean }> = ({
  subtitle,
  description,
  children,
  andre
}) => {
  // Try to avoid using these.
  // You want to do as much in CSS as possible because these are obviously not accessible during server-side rendering
  const smallScreen = useMediaQuery({ maxWidth: 1400 });
  const lightTheme = useMediaQuery({ query: "(prefers-color-scheme: light)" });

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          author
          dwebUrl
          siteUrl
          title
        }
      }
    }
  `);

  const Web3Banner = ({ locationProps }) => {

    const dwebUrlLimo = "https://" + data.site.siteMetadata.dwebUrl + ".limo" + locationProps.location.pathname
    const cwebUrlChopped = data.site.siteMetadata.siteUrl.split('://')[1]
    const Dweb = () => <span style={{ fontFamily: "Pacifico" }}>dweb</span>

    return locationProps.location.hostname !== undefined ?
      (locationProps.location.hostname.includes(cwebUrlChopped) ?
        <>
          You're viewing my site on the centralized web. Check me out on the <a target="_blank" href={dwebUrlLimo}><Dweb /></a> ! (Warning: it's slow.)
        </>
        : locationProps.location.hostname.includes(".eth") || locationProps.location.hostname.includes("ipfs") ?
          <>
            You're on the <Dweb />! You can always go back to the <a href={data.site.siteMetadata.siteUrl + locationProps.location.pathname}>centralized version</a> if it's too slow.
          </>
          : locationProps.location.hostname.includes("127.0.0.1") || locationProps.location.hostname.includes("codespace") ?
            <>
              You seem to be developing locally. The centralized url is <a href={data.site.siteMetadata.siteUrl + locationProps.location.pathname}>{cwebUrlChopped}</a> and the <Dweb /> url is <a target="_blank" href={dwebUrlLimo}>{data.site.siteMetadata.dwebUrl}</a>.
            </>
            : <></> /* not sure where they are */)
      : <></> // building
  }

  return (
    <Location>
      {(locationProps) => <>
        <SEO title={subtitle} description={description} />
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300&family=Pacifico&family=Source+Sans+Pro&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="canonical" href={`${data.site.siteMetadata.siteUrl}${locationProps.location.pathname}`}></link>
        </Helmet>

        <Header
          siteTitle={andre ? `${data.site.siteMetadata.author} (aka Chad Nauseam)` : data.site.siteMetadata.title}
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

          <div className="Web3-Link fadeIn">
            <Web3Banner locationProps={locationProps} />
          </div>


          <div
            className="socials-container fadeIn"
          >
            <SocialButton
              text="My Discord"
              color="#23272A"
              icon={discord}
              href={`${data.site.siteMetadata.siteUrl}/discord`}
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
              href={`${data.site.siteMetadata.siteUrl}/twitter`}
            ></SocialButton>
          </div>

        </div>
      </>
      }
    </Location>
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
