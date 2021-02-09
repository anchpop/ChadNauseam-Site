import * as React from "react"
import { Link } from "gatsby"

import { useMediaQuery } from "react-responsive"
import { Tooltip } from "react-tippy"

import { select } from "d3"

import Layout from "../../../components/layout"
import Image from "../../../components/image"

import "react-tippy/dist/tippy.css"

const currentTime = () => new Date().getTime() / 1000

const Content = ({ time, smallScreen }) => {
  const [data, setData] = React.useState([25, 30, 45, 60, 20])
  const svgRef = React.useRef()
  React.useEffect(() => {
    const svg = select(svgRef.current)
    svg
      .selectAll("circle")
      .data(data)
      .join(
        (enter) => enter.append("circle").attr("class", "new"),
        (update) => update.attr("class", "updated"),
        (exit) => exit.remove()
      )
      .attr("cx", (d, i) => i * 16 + time)
      .attr("cy", (d, i) => 10)
      .attr("r", (d, i) => d / 10)
  }, [data, time])
  return (
    <>
      <Tooltip
        // options
        title="Welcome to React"
        position="bottom"
        trigger="click"
      >
        <span>Click here to show popup</span>
      </Tooltip>
      <p>Test</p>
      <svg ref={svgRef}></svg>
      <p>Test</p>
      <button onClick={() => setData(data.map((v) => v + 5))}>
        update data
      </button>
      <button onClick={() => setData(data.filter((v) => v < 50))}>
        filter data
      </button>
      <p>{time}</p>
      <p>{smallScreen ? "small" : "big"}</p>
    </>
  )
}

const AcousticConsonance = () => {
  const [startingTime, setStartingTime] = React.useState(currentTime())
  const [time, setTime] = React.useState(currentTime())

  React.useEffect(() => {
    setStartingTime(currentTime())
  }, [])

  React.useEffect(() => {
    setInterval(() => {
      setTime(currentTime())
    }, 1000 / 60)
  }, [])

  const smallScreen = useMediaQuery({ maxWidth: 1400 })

  return (
    <Layout
      subtitle="Music Theory - Acoustic Consonance"
      description="Your source for all things Chad"
    >
      <Content time={time - startingTime} smallScreen={smallScreen} />
    </Layout>
  )
}

export default AcousticConsonance
