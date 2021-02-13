import * as React from "react";
import "katex/dist/katex.min.css";
import { InlineMath as Im, BlockMath } from "react-katex";

import { SeriesLayout } from "../../../components/layout";
import Tip, { MusicTheoryTip } from "../../../components/tip";
import Sn from "../../../components/sn";
import { I } from "../../../components/typography";

import demisemihemidemisemiquaver from "../../../images/music/demisemihemidemisemiquaver.svg";

const MusicNotation = () => {
  return (
    <SeriesLayout>
      <Sn>
        There are basically 5 fundamental principles of music theory. They're
        fundamental because there aren't any simpler rules they can be derived
        from. They're expressed in pretty much every human culture that's
        discovered multiple people can sing at the same time. They are:
        <ol>
          <li>Acoustic consonance</li>
          <li>Scales</li>
          <li>Conjunct melodic motion</li>
          <li>Harmonic consistency</li>
          <li>Centricity</li>
        </ol>
      </Sn>
      <Sn>
        If you're not familiar with these terms, blame the education system.
        (They're not necessarily at fault, but they sure are fun to blame.) I'll
        explain them one at a time.
      </Sn>
      <h2>I Don't Like Music Notation By The Way</h2>
      <Sn>
        This is a 256th note, also called the demisemihemidemisemiquaver (I wish
        I was joking):
      </Sn>
      <Sn>
        <img src={demisemihemidemisemiquaver} className="invert-if-dark" />
      </Sn>
      <Sn>
        This note has{" "}
        <a href="https://en.wikipedia.org/wiki/Two_hundred_fifty-sixth_note">
          its own Wikipedia page
        </a>
        ! Music notation certainly has its place but I won't be talking about it
        in this essay because it overcomplicates things for beginners. It has a
        large amount of historical baggage and (in my eyes) outdated design
        choices.
      </Sn>
    </SeriesLayout>
  );
};

export default MusicNotation;
