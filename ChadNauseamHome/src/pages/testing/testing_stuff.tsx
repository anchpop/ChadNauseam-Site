import * as React from "react";
import { Link } from "gatsby";

import { select } from "d3";

import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

import Layout from "../../components/layout";
import Image from "../../components/image";
import Tip, { MusicTheoryTip } from "../../components/tip";
import Sn from "../../components/sn";
import Note from "../../components/note";
import { I } from "../../components/typography";

import useResizeObserver from "../../utils/resizeObserver";

import ThemeContext from "../../utils/themeContext";

const currentTime = () => new Date().getTime() / 1000;

const Content = ({ time }) => {
  const { smallScreen } = React.useContext(ThemeContext);

  const [data, setData] = React.useState([25, 30, 45, 60, 20]);
  //const wrapperRef = React.useRef()
  const svgRef = React.useRef();
  //const dimensions = useResizeObserver(wrapperRef)

  React.useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join(
        (enter) => enter.append("circle").attr("class", "new"),
        (update) => update.attr("class", "updated"),
        (exit) => exit.remove()
      )
      .attr("cx", (d, i) => i * 16 + time * 10)
      .attr("cy", (d, i) => 10)
      .attr("r", (d, i) => d / 10);
  }, [data, time]);
  return (
    <>
      <Sn>
        Music is <I>old</I>. It might be older than language. And I've always
        found it interesting that unlike any other medium, music has a *theory*.
        If you've ever looked into it, <MusicTheoryTip /> probably felt complex
        and arbitrary. That's because there's a persistent teaching error in
        almost all music theory materials - let me explain by analogy.
      </Sn>
      <Sn>
        To succeed in math class, you have two routes available to you:
        <ol>
          <li>
            You can memorize rules for finding the answer to the questions you
            predict will be on the quiz, or
          </li>
          <li>You can try to understand the underlying concepts.</li>
        </ol>
        In high school calc, most of my classmates took the first option. Math
        can be an interesting subject, but without the proper understanding it
        just seemed like an arbitrary collection of rules. So my classmates
        complained that the class seemed boring and useless.
      </Sn>

      <p>Test</p>
      <p>
        test1{" "}
        <Tip content="test" fancy={false}>
          test2
        </Tip>
        test3
      </p>
      <h3>
        <InlineMath math="\int_0^\infty x^2 dx" />
      </h3>

      <Sn>
        sidenotes test sidenotes test sidenotes test sidenotes test sidenotes
        test sidenotes test sidenotes test sidenotes
        <Note numbered>
          <InlineMath math="\int_0^\infty x^2 dx" />
        </Note>{" "}
        test side notes test side notes test side notes test side notes test
        side notes test side notes test side notes test side notes test side
        notes test side notes test<Note numbered>mytest2</Note> side notes test
        side notes test side notes test side notes test side notes test side
        notes test side notes test side notes test
        <Note>
          Long note <InlineMath math="\int_0^\infty x^2 dx" /> test{" "}
          <InlineMath math="\int_0^\infty x^2 dx" /> test{" "}
          <InlineMath math="\int_0^\infty x^2 dx" /> test
        </Note>{" "}
      </Sn>

      <div key="svg-wrap" className="svg-wrap">
        <svg ref={svgRef} style={{ width: "100%" }}></svg>
      </div>

      <p>
        Test Test Test Test Test Test Test Test Test Test Test Test Test Test
        Test Test Test Test Test Test Test Test{" "}
      </p>
      <button onClick={() => setData(data.map((v) => v + 5))}>
        update data
      </button>
      <button onClick={() => setData(data.filter((v) => v < 50))}>
        filter data
      </button>
      <p>{time}</p>
      <p>{smallScreen ? "small" : "big"}</p>
    </>
  );
};

const AcousticConsonance = () => {
  const [startingTime, setStartingTime] = React.useState(currentTime());
  const [time, setTime] = React.useState(currentTime());

  React.useEffect(() => {
    setStartingTime(currentTime());
  }, []);

  React.useEffect(() => {
    setInterval(() => {
      setTime(currentTime());
    }, 1000 / 60);
  }, []);
  return (
    <Layout
      subtitle="Music Theory - Acoustic Consonance"
      description="Your source for all things Chad"
    >
      <Content time={time - startingTime} />
    </Layout>
  );
};

export default AcousticConsonance;
