import * as React from "react";
import Luxon, { DateTime, Interval, Duration } from "luxon"
import { select, svg } from "d3";
import { mapValues } from "lodash";

import Layout from "../../components/layout";



const exampleLog = {
  break: [
    Interval.before(DateTime.now().minus(Duration.fromObject({ seconds: 72 })), Duration.fromObject({ seconds: 15 }))
  ],
  work: [
    Interval.before(DateTime.now(), Duration.fromObject({ seconds: 52 })), Interval.before(DateTime.now().minus(Duration.fromObject({ seconds: 132 })), Duration.fromObject({ seconds: 22 }))
  ]
}

const Content = ({ duration }: { duration: Duration }) => {
  const svgRef = React.useRef();
  const [timelog, setTimelog] = React.useState(exampleLog);

  const width = 1000;
  const height = 300;
  React.useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${width} ${height}`);
  }, []);

  React.useEffect(() => {
    const amountThrough = (interval: Interval, time: DateTime) => (
      Interval.fromDateTimes(interval.start, time).toDuration().toMillis() / interval.toDuration().toMillis()
    );
    console.log(duration);
    const timelogMerged = mapValues(timelog, Interval.merge);
    const timelogLableled =
      timelog.break.map(i =>
        ({ typ: "break", interval: i })).concat(timelog.work.map(i =>
          ({ typ: "work", interval: i })))

    const workInterval = timelogMerged.work.reduce((previousValue, currentValue) => currentValue.union(previousValue));
    const breakInterval = timelogMerged.break.reduce((previousValue, currentValue) => currentValue.union(previousValue));
    const allIntervals = workInterval.union(breakInterval);
    const allIntervalsExtended =
      Interval.fromDateTimes(allIntervals.start.minus(Duration.fromObject({ minutes: 1 })), DateTime.max(allIntervals.end, DateTime.now()));

    const getx = (interval: Interval) => (
      amountThrough(allIntervalsExtended, interval.start) * width
    )
    const getwidth = (interval: Interval) => (
      (interval.toDuration().toMillis() / allIntervalsExtended.toDuration().toMillis()) * width
    )

    const svg = select(svgRef.current);
    svg
      .selectAll("rect")
      .data(timelogLableled)
      .join(
        (enter) => enter.append("rect").attr("class", "new"),
        (update) => update.attr("class", "updated"),
        (exit) => exit.remove()
      )
      .transition()
      .duration(1000)
      .attr('x', ({ typ, interval }, i) => getx(interval))
      .attr('y', (d, i) => 0)
      .attr('width', ({ typ, interval }, i) => getwidth(interval))
      .attr('height', (d, i) => height)
      .attr('stroke', (d, i) => 'black')
      .attr('fill', (d, i) => '#69a3b2')
      ;
  }, [timelog, duration]);

  return (<>
    <p>
      Concept by <a href="https://www.lesswrong.com/users/bfinn">bfinn</a> on <a href="https://www.lesswrong.com/posts/RWu8eZqbwgB9zaerh/rational-breaks-a-better-way-to-work">lesswrong</a>.
    </p>
    <p>
      <em>Ratio</em>nal breaks is a time-management system where you can work as long as you want, and take breaks whenever you want, as long as you always maintain a 3:1 <em>ratio</em> of worktime:breaktime.
    </p>
    <div key="svg-wrap" className="svg-wrap">
      <svg ref={svgRef} style={{ width: "100%" }}></svg>
    </div>

  </>
  );
};

export default () => {

  const [startingTime, setStartingTime] = React.useState(DateTime.now());

  const getDuration = () => Duration.fromMillis(Interval.fromDateTimes(startingTime, DateTime.now()).toDuration().milliseconds)
  const [duration, setDuration] = React.useState(getDuration());

  React.useEffect(() => {
    setInterval(() => {
      setDuration(getDuration());
    }, 1000);
  }, []);
  return (
    <Layout subtitle="Rational Breaks: a better way to work" description="404">
      <Content duration={duration} />
    </Layout>
  )
}