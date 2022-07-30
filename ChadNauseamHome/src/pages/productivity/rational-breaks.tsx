import * as React from "react";
import Luxon, { DateTime, Interval, Duration } from "luxon"
import { select, svg } from "d3";
import { mapValues, padStart } from "lodash";

import "@fontsource/inconsolata"

import "../../components/css/rational-breaks.css";

import Layout from "../../components/layout";

type Action = "break" | "neither" | "work";
const actions: Action[] = ["break", "neither", "work"]
type Log = {
  break: Luxon.Interval[];
  work: Luxon.Interval[];
}
type Mode = { mode: "neither"; } | { mode: "break" | "work", start: DateTime }

const exampleLog: Log = {
  break: [
    Interval.before(DateTime.now().minus(Duration.fromObject({ seconds: 30 })), Duration.fromObject({ seconds: 22 }))
  ],
  work: [
    Interval.before(DateTime.now().minus(Duration.fromObject({ seconds: 82 })), Duration.fromObject({ seconds: 30 }))
  ]
}
const exampleMode: Mode =
  true ? { mode: "break", start: DateTime.now().minus(Duration.fromObject({ seconds: 1 })) } : (false ? { mode: "work", start: DateTime.now().minus(Duration.fromObject({ seconds: 15 })) } : { mode: "neither" })

function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}
function easeIn(x: number, p: number): number {
  return Math.pow(x, p);
}


const processTimeLog = (
  timelog: Log,
  currentTime: DateTime,
  mode: Mode,
  buffer: Duration,
  maxRange: Duration) => {
  const maxTime = Interval.before(currentTime, maxRange);
  const timelogMerged = mapValues(timelog, (entries) =>
    Interval.merge(entries)
      .map(entry => maxTime.intersection(entry))
      .filter(entry => entry !== null));
  const timelogLableled =
    timelogMerged.break.map(i =>
      ({ typ: "break", interval: i })).concat(timelogMerged.work.map(i =>
        ({ typ: "work", interval: i }))).slice().sort((a, b) => a.interval.start.toMillis() - b.interval.start.toMillis())



  const workInterval = timelogMerged.work.length !== 0 ?
    timelogMerged.work.reduce((previousInterval, accumulatedInterval) => accumulatedInterval.union(previousInterval)) :
    undefined;
  const breakInterval = timelogMerged.break.length !== 0 ?
    timelogMerged.break.reduce((previousInterval, accumulatedInterval) => accumulatedInterval.union(previousInterval)) :
    undefined;
  const intervalUnion =
    workInterval ?
      (breakInterval ? workInterval.union(breakInterval) : workInterval) :
      (breakInterval ? breakInterval : undefined);
  const workDuration =
    timelogMerged.work.reduce((accumulatedInterval, previousInterval) => accumulatedInterval.plus(previousInterval.toDuration()), Duration.fromObject({ seconds: 0 }));
  const breakDuration =
    timelogMerged.break.reduce((accumulatedInterval, previousInterval) => accumulatedInterval.plus(previousInterval.toDuration()), Duration.fromObject({ seconds: 0 }));

  const intervalUnionExtended = intervalUnion ?
    Interval.fromDateTimes(
      intervalUnion.start.minus(buffer),
      DateTime.max(intervalUnion.end, currentTime)) :
    Interval.before(currentTime, (mode.mode !== "neither" ? Interval.fromDateTimes(mode.start, currentTime).toDuration() : Duration.fromObject({ seconds: 0 })).plus(buffer));
  const combo: {
    timelogLableled: {
      typ: string;
      interval: Luxon.Interval;
    }[];
    workDuration: Luxon.Duration;
    breakDuration: Luxon.Duration;
    intervalUnionExtended: Luxon.Interval;
  } = {
    timelogLableled: timelogLableled,
    workDuration: workDuration.normalize(),
    breakDuration: breakDuration.normalize(),
    intervalUnionExtended: intervalUnionExtended
  };
  return combo;
}
const appendToTimelog = (timelog: Log, currentMode: Mode, currentTime: DateTime, seconds: Number) => {
  let newLog: Log = currentMode.mode !== "neither" && Interval.fromDateTimes(currentMode.start, currentTime).toDuration().as("seconds") > seconds ? {
    ...timelog,
    [currentMode.mode]: [
      ...timelog[currentMode.mode],
      Interval.fromDateTimes(currentMode.start, currentTime)
    ]
  } : timelog;
  return newLog;
}

const Content = ({ interval }: { interval: Interval }) => {
  const easing = 2;
  const duration = interval.toDuration()
  const currentTime = interval.end;
  const svgRef = React.useRef();
  const boxesRef = React.useRef();
  const currentRef = React.useRef();

  const [{ timelog, currentMode }, update] =
    React.useReducer(
      (state: { timelog: Log, currentMode: Mode }, action: Action) => {
        console.log({ log: state.timelog, action: action, statecurrentModemode: state.currentMode.mode });
        if (action === state.currentMode.mode) {
          return state;
        }
        else {
          let timelog: Log = appendToTimelog(state.timelog, state.currentMode, currentTime, 5);
          let currentMode: Mode = action !== "neither" ?
            { mode: action, start: currentTime } :
            { mode: "neither" };
          let newState: { timelog: Log, currentMode: Mode } = {
            timelog,
            currentMode
          }
          return newState;
        };
      },
      { timelog: exampleLog, currentMode: exampleMode }
    );


  const width = 1000;
  const height = 300;
  React.useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${width} ${height}`);
  }, []);

  const {
    timelogLableled,
    workDuration,
    breakDuration,
    intervalUnionExtended
  } = processTimeLog(
    appendToTimelog(timelog, currentMode, currentTime, 0),
    currentTime,
    currentMode,
    Duration.fromObject({ minutes: 1 }),
    Duration.fromObject({ hours: 24 }));
  const getBoxDims = (interval: Interval) => {
    const amountThrough = (interval: Interval, time: DateTime) => (
      Interval.fromDateTimes(interval.start, time).toDuration().toMillis() / interval.toDuration().toMillis()
    );

    const getx = (interval: Interval) => (
      easeIn(amountThrough(intervalUnionExtended, interval.start), easing) * width
    )
    const getx2 = (interval: Interval) => (
      easeIn(amountThrough(intervalUnionExtended, interval.end), easing) * width
    )
    const getwidth = (interval: Interval) => (
      getx2(interval) - getx(interval)
    )
    return { x: getx(interval), y: 10, width: getwidth(interval), height: height - 10 }
  }
  React.useEffect(() => {
    const svg = select(boxesRef.current);
    const t = svg.transition()
      .duration(200);
    svg
      .selectAll("rect")
      .data(timelogLableled)
      .join(
        (enter) => enter.append("rect")
          .attr('y', ({ typ, interval }, i) => getBoxDims(interval).y)
          .attr('class', ({ typ, interval }, i) =>
            `${typ}-window ${interval.toDuration().as("seconds") < 5 ? "short-window" : ""}`)
          .attr('height', ({ typ, interval }, i) => getBoxDims(interval).height)
          .attr('width', ({ typ, interval }, i) => getBoxDims(interval).width)
          .attr('x', ({ typ, interval }, i) => getBoxDims(interval).x),
        (update) => update
          .attr('class', ({ typ, interval }, i) =>
            `${typ}-window ${interval.toDuration().as("seconds") < 5 ? "short-window" : ""}`),
        (exit) => exit
          .call(exit => exit.transition(t)
            .attr("opacity", 0)
            .remove())
      )
      .transition(t)
      .attr('x', ({ typ, interval }, i) => getBoxDims(interval).x)
      .attr('y', ({ typ, interval }, i) => getBoxDims(interval).y)
      .attr('width', ({ typ, interval }, i) => getBoxDims(interval).width)
      .attr('height', ({ typ, interval }, i) => getBoxDims(interval).height)
      ;
  }, [timelog, duration]);

  return (<>
    <p>
      Concept by <a href="https://www.lesswrong.com/users/bfinn">bfinn</a> on <a href="https://www.lesswrong.com/posts/RWu8eZqbwgB9zaerh/rational-breaks-a-better-way-to-work">lesswrong</a>.
    </p>
    <p>
      <em>Ratio</em>nal breaks is a time-management system where you can work as long as you want, and take breaks whenever you want, as long as you always maintain a 3:1 <em>ratio</em> of worktime:breaktime.
    </p>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} className="ratioContainer">
        <div className="work-time">
          {workDuration.toFormat('hh:mm:ss')}
        </div>
        <hr />
        <div className="break-time">
          {breakDuration.toFormat('hh:mm:ss')}
        </div>
      </div>
      <div>
        =
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} className="ratioContainer">
        <div className="work-time">
          {(workDuration.as("seconds") / breakDuration.as("seconds")).toFixed(2)}
        </div>
        <hr />
        <div className="break-time">
          1
        </div>
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {
        actions.map((action) => (
          <button onClick={() => update(action)} disabled={action === currentMode.mode} className={`${action}-button`}>
            {action}
          </button>
        ))
      }
    </div>
    <div key="svg-wrap" className="svg-wrap">
      <svg ref={svgRef} style={{ width: "100%" }}>
        <g ref={boxesRef} style={{ width: "100%", height: "100%" }}></g>
        <g ref={currentRef} style={{ width: "100%", height: "100%" }}></g>
      </svg>
    </div>

  </>
  );
};

export default () => {
  const [startingTime, setStartingTime] = React.useState(DateTime.now());

  const getInteravl = () => Interval.fromDateTimes(startingTime, DateTime.now())
  const [interval, setDuration] = React.useState(getInteravl());

  React.useEffect(() => {
    setInterval(() => {
      setDuration(getInteravl());
    }, 500);
  }, []);
  return (
    <Layout subtitle="Rational Breaks: a better way to work" description="A tool I made for using bfinn's rational breaks strategy" nodisclaimer>
      <Content interval={interval} />
    </Layout>
  )
}
