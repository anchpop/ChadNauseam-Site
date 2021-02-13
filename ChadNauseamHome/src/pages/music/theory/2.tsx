import * as React from "react";
import { Link } from "gatsby";

import { select } from "d3";

import "katex/dist/katex.min.css";
import { InlineMath as Im, BlockMath } from "react-katex";

import { SeriesLayout } from "../../../components/layout";
import Image from "../../../components/image";
import Tip, { MusicTheoryTip } from "../../../components/tip";
import Sn from "../../../components/sn";
import Note from "../../../components/note";
import { I } from "../../../components/typography";

import { SimpleNotePlayer, soundmag } from "../../../utils/music/waves";

import useResizeObserver from "../../../utils/resizeObserver";
import runEveryFrame from "../../../utils/runEveryFrame";

import ThemeContext from "../../../utils/themeContext";
import TimeContext from "../../../utils/timeContext";
import { set } from "lodash";

const WaveForm = () => {
  /*
  const svgRef = React.useRef();
  const [data, setData] = React.useState([25, 30, 45, 60, 20]);

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
    <div key="svg-wrap" className="svg-wrap">
      <svg ref={svgRef} style={{ width: "100%" }}></svg>
    </div>
  );*/
};

const Content = () => {
  return (
    <>
      <Sn>
        Talking about music is like dancing about architecture, so let's cut to
        the chase. Listen to how shocking this tone sounds:
      </Sn>

      <SimpleNotePlayer
        notes={[390 * 1.5, 430 * 1.5, 500 * 1.5]}
        mag={soundmag}
        description="dissonant-example"
      />
    </>
  );
};

const AcousticConsonance = () => {
  const [time, setTime] = React.useState(0);
  React.useEffect(() => {
    runEveryFrame((time) => {
      setTime(time);
    });
  }, []);
  return (
    <SeriesLayout>
      <TimeContext.Provider value={{ time: time }}>
        <Content />
      </TimeContext.Provider>
    </SeriesLayout>
  );
};

export default AcousticConsonance;
