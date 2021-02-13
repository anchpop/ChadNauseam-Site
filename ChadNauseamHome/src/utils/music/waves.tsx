import * as React from "react";
import { range, sum } from "lodash";
import * as d3 from "d3";

import simplify from "simplify-js";

import TimeContext from "../timeContext";

export const repetitions = 7;
export const fidelity = 400;
export const base_x_stretch = 2 * Math.PI;
export const scale = 30;
export const margin = 10;
export const stretch = 20;
export const nomag = { magFactor: 1, magFactorRepetition: 1 };
export const soundmag = { magFactor: 440, magFactorRepetition: 220 };
export const soundmag_out = { magFactor: 440, magFactorRepetition: 440 };

export const sin = Math.sin;

export const wave = ({ waveType, frequency, speed, phase, amplitude }) => ({
  waveFunc: (t) => (x) =>
    amplitude *
    waveType(
      frequency * (x - t * speed + (phase * base_x_stretch) / frequency)
    ),
  amplitude,
  frequency,
});

export const SimpleNotePlayer = ({ notes, mag, description, options = {} }) => {
  const { speed, amplitude_adjustment, show_frequencies } = Object.assign(
    { speed: 1, amplitude_adjustment: notes.length, show_frequencies: false },
    options
  );
  const mywaves = notes.map((frequency) => ({
    waveType: sin,
    frequency: frequency,
    speed: speed,
    phase: 0,
    amplitude: 1 / amplitude_adjustment,
  }));

  return wavePlayer({
    waves: mywaves,
    repetitions,
    mag,
    description,
    options,
  });
};

export const wavePlayer = ({
  waves,
  repetitions,
  mag,
  description,
  options,
}) => {
  const { time } = React.useContext(TimeContext);

  const svgRef = React.useRef();

  const { show_frequencies } = Object.assign(
    { show_frequencies: false },
    options
  );
  const frequency_display = (
    <span className="frequency-display">
      {waves.map(({ frequency }, key) => (
        <span className="frequency-display-item" key={key}>
          {frequency.toFixed(0)} Hz
        </span>
      ))}
    </span>
  );

  const Play = (
    <PlayButton
      id={description + "-play-button"}
      onClick={async () => {
        /*
let s = synth;
if (synth.unset) {
  const synthToUse = new Tone.PolySynth(Tone.Synth).toDestination();
  s = synthToUse;
  mutable synth = Object.assign(synthToUse, { unset: false });
}
const sounds = _.uniqBy(waves, "frequency").filter(
  ({ frequency }) => frequency > 20 && frequency < 20000
);

const toSample = 200;
const volume =
  _.sum(
    _.range(0, toSample).map(() =>
      Math.abs(w.waveFunc(Math.random())(Math.random()))
    )
  ) / toSample;

sounds.forEach(({ frequency }) => {
  s.triggerAttackRelease(frequency, .4, Tone.now(), volume);
});
*/
      }}
    />
  );

  React.useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    showWave(svg, waves.map(wave), time, repetitions, mag, description);
  }, [time]);

  return (
    <>
      {Play}
      {show_frequencies ? frequency_display : <></>}
      <svg ref={svgRef}></svg>
    </>
  );
};

export const PlayButton = (props) => (
  <button className="play" {...props}>
    Play ▸
  </button>
);

export const showWave = (
  svg,
  waves,
  t,
  repetitions,
  { magFactor, magFactorRepetition },
  description
) => {
  const waveFunc = (t) => (x) =>
    sum(waves.map(({ waveFunc }) => waveFunc(t)(x)));

  const waveHeights = heights(
    waveFunc,
    repetitions / magFactorRepetition,
    t / magFactor
  );

  const totalHeight =
    sum(waves.map(({ amplitude }) => amplitude)) * 2 * scale + margin * 2;

  const fundamental_frequency = gcd(waves.map(({ frequency }) => frequency));

  const createWave = (heights, stretch) => {
    const l = heights.length;
    const unsimple = heights.map((height, index) => ({
      x: (index / l) * stretch,
      y: height,
    }));
    const simple = simplify(unsimple, 0.01, true);

    return simple.map(({ x, y }) => ({
      time: x,
      pressure_delta: y,
    }));
  };

  const wavePoints = createWave(waveHeights, stretch);

  //svg.attr("viewBox", [0, 0, width, totalHeight]);

  svg
    .attr("id", description + "-path")
    .append("path")
    .attr("d", line(totalHeight)(wavePoints))
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "3");

  if (false) {
    svg.append("path").attr("d");
  }

  return Object.assign(svg, {
    waveFunc,
    totalHeight,
    wavePoints,
    waveHeights,
    createWave,
  });

  /*return Object.assign(svg.node(), {
      update(domain) {
        const t = svg.transition().duration(750);
        zx.domain(domain);
        gx.transition(t).call(xAxis, zx);
        path.transition(t).attr("d", line(data));
      }
    });*/
};

export const heights = (waveFunc, repetitions, t) => {
  const indices = range(0, fidelity + 1).map((i) => i / fidelity);
  const f = waveFunc(t * base_x_stretch);
  return indices.map((i) => {
    const scale = repetitions * base_x_stretch;
    return f(i * scale);
  });
};

export const gcd = (input) => {
  const gcd_two_numbers = (x, y) => {
    if (typeof x !== "number" || typeof y !== "number") return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x;
  };

  if (toString.call(input) !== "[object Array]") return false;
  var len, a, b;
  len = input.length;
  if (!len) {
    return null;
  }
  a = input[0];
  for (var i = 1; i < len; i++) {
    b = input[i];
    a = gcd_two_numbers(a, b);
  }
  return a;
};

export const line = (totalHeight) => {
  const offset = totalHeight / 2;
  return d3
    .line()
    .x((d) => d.time * scale)
    .y((d) => -d.pressure_delta * scale + offset);
};
