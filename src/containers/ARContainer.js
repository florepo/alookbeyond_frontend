import React, { useEffect, useRef, useState } from "react";
import { ViewportAR } from "./ViewportAR";

const ARContainer = ({ ARview, sats}) => {
  
  const canvasEl = useRef(null);

  useEffect(() => {
    console.log("ARview",ARview)
    console.log("sats",sats)
    ViewportAR(canvasEl.current);
  });

  return (
    <div>
      {ARview ? (
        <div className="viewport-ar" ref={canvasEl}></div>
      ) : (
        <div className="viewport-ar" ref={canvasEl} hidden></div>
      )}
    </div>
  );
};

export default ARContainer;
