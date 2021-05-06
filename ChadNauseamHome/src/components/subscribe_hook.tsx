import React from "react";
import subscribe_hook from "../images/subscribe_hook.png";
import Sn from "./sn";

const SubscribeHook = ({}) => (
  <a href="https://chadnauseam.substack.com">
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Sn>Like what you're reading? Subscribe to my newsletter :p</Sn>
      <div style={{ maxWidth: "50%" }} className="subscribe-hook-image">
        <img
          src={subscribe_hook}
          className="invert-if-dark"
          style={{ borderRadius: 15 }}
        />
      </div>
    </div>
  </a>
);

export default SubscribeHook;
