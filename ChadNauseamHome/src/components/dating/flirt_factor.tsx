import React from "react";
import { InlineMath, BlockMath } from "react-katex";

export default ({ true_positive, false_positive }) => (
  <>
    <InlineMath
      math={`\\frac{${true_positive}\\%}{${false_positive}\\%} = ${(
        true_positive / false_positive
      ).toFixed(1)}`}
    />
  </>
);
