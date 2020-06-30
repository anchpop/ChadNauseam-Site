import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout subtitle="General Info">
    <SEO title="Home" />
    <p>I'm <mark>Chad Nauseam</mark>.</p>
    <p>I make <a href="/youtube">YouTube videos</a>. They're mostly about politics so far but I don't know if they're going to stay that way forever.</p>
    <p>I also like programming, but only in hipster languages like Rust and Haskell.</p>
    <p>This website is a work in progress (like most things in my life). The only reason it exists is because I wanted to tell people to follow me on youtube but I was worried they wouldn't know how to spell nauseam. For that reason you can also find this site at <a href="https://chadnauseum.com/">chadnauseum.com</a> as well.</p>
    <p>If you'd like to talk to me, message me on <a href="/twitter">Twitter</a>, shoot me an email at `contact at chadnauseum dot com`, or join <a href="/discord">my Discord</a>.</p>
  </Layout>
)

export default IndexPage
