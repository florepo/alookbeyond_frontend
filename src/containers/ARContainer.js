import React, { useEffect, useRef, useState } from "react";
import { mount } from "../ar/ar_visualizer";

const ARContainer = ({ ARview, sats}) => {
  
  const canvasEl = useRef(null);

  //"component did mount"
  useEffect(() => {
    console.log("ARview",ARview)
    console.log("sats",sats)
    console.log(sats.length)

    if(sats.length>0){mount(canvasEl.current)};
  },);

  return (
    <div>
      {ARview ? (
        <div className="viewport_ar" ref={canvasEl}></div>
      ) : (
        <div className="viewport_ar" ref={canvasEl} hidden></div>
      )}
    </div>
  );
};

export default ARContainer;
