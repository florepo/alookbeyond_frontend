import React, { useEffect, useRef, useState } from "react";
import { mount } from "../ar/ar_visualizer";

const ARContainer = ({ ARview, sats}) => {
  
  const canvasEl = useRef(null);

  //"component did mount"
  useEffect(() => {
    console.log("ARview",ARview)
    console.log("sats",sats)

    if(sats && sats.length>0){mount(canvasEl.current, sats, ARview)};
  },);

  return (
    <div>
      {ARview ? (
        <div className="viewport_ar" ref={canvasEl} sats={sats}></div>
      ) : (
        <div className="viewport_ar" ref={canvasEl} hidden></div>
      )}
    </div>
  );
};

export default ARContainer;
