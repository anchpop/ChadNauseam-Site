import * as React from "react";
import "katex/dist/katex.min.css";
import { InlineMath as Im, BlockMath } from "react-katex";

import { SeriesLayout } from "../../../components/layout";
import Tip, { MusicTheoryTip } from "../../../components/tip";
import Sn from "../../../components/sn";
import { I } from "../../../components/Typography";

const AcousticConsonance = () => {
  // I think this section should be rewritten to talk explicitly about
  // richard feynman's "Instead of arbitrarily memorizing things, look
  // for the explanation that makes it obvious"
  // That might not actually be a feynman quote, incidentally.
  // I'm not sure where I got it from

  return (
    <SeriesLayout>
      <Sn>
        Music is <I>old</I>. It might be older than language. And I've always
        found it interesting that unlike any other medium, music has a{" "}
        <I>theory</I>. If you've ever looked into it, <MusicTheoryTip />{" "}
        probably felt complex and arbitrary. That's because there's a persistent
        teaching error in almost all music theory materials - let me explain by
        analogy.
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

      <Sn>
        My attention span isn't long enough to pay attention in class, so I had
        to spend twice as long watching{" "}
        <a href="https://www.youtube.com/watch?v=54_XRjHhZzI">
          a YouTube professor
        </a>{" "}
        attempt to teach the skills everyone else had already learned. But I
        think it was for the best: he managed to teach in a way that nudged his
        students to build a really strong understanding of the basic concepts,
        then use that understanding to build onto the next ones, and so on.
      </Sn>

      <Sn>
        Over time, this approach pays off. You can try to memorize a huge list
        of rules for performing derivatives, but knowing the actual definition
        of a{" "}
        <Tip
          content={
            <>
              The derivative of a function <Im math="f" /> is just another
              function <Im math="f\prime" /> that tells you <Im math="f" />
              's slope at any given point.
            </>
          }
          fancy
        >
          derivative
        </Tip>{" "}
        allows you to compress them all into a unified structure. This approach
        makes everything much easier to remember (in the worst-case scenario,
        you just need to remember the basic concepts and re-derive the advanced
        ones in your head).
      </Sn>

      <Sn>
        Pretty much all music theory material encourages memorization over
        understanding. The practical rules of music theory were basically
        discovered by rote trial and error, and only recently have the actual
        underlying principles been discovered. This makes music theory seem much
        more complicated and arbitrary than it has to be. But once you
        understand those underlying principles, advanced "college-level" music
        theory will seem simple and obvious to you. That's my promise for this
        collection of essays.
      </Sn>

      <Sn>
        <blockquote>
          All music is folk music. I ain’t never heard a horse sing a song.
          <footer>― Louis Armstrong</footer>
        </blockquote>
      </Sn>
    </SeriesLayout>
  );
};

export default AcousticConsonance;
