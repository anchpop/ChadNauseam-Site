import * as React from "react";
import { Link } from "gatsby";

import { select } from "d3";

import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

import Layout from "../../../components/layout";
import Image from "../../../components/image";
import Tip from "../../../components/tip";
import Sn from "../../../components/sn";
import Note from "../../../components/note";

import useResizeObserver from "../../../utils/resizeObserver";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

import ThemeContext from "../../../utils/themeContext";

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
      <p>Test</p>
      <p>
        test1 <Tip content="music">test</Tip> test2
      </p>
      <h3>
        <InlineMath math="\int_0^\infty x^2 dx" />
      </h3>

      <Sn>
        sidenotes test sidenotes test sidenotes test sidenotes test sidenotes
        test sidenotes test sidenotes test sidenotes
        <Note index={1}>
          <InlineMath math="\int_0^\infty x^2 dx" />
        </Note>{" "}
        test sidenotes test sidenotes test sidenotes test sidenotes test
        sidenotes test sidenotes test sidenotes test sidenotes test sidenotes
        test sidenotes test <Note index={2}>mytest2</Note>sidenotes test
        sidenotes test sidenotes test sidenotes test sidenotes test sidenotes
        test sidenotes test sidenotes test
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
