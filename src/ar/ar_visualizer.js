// import React, { useEffect, useRef, useState } from "react";
import {sgp4, twoline2satrec, propagate, gstime} from "satellite.js"
// import {Scene} from 'react-fiber-three'

import {createSatelliteGeoModel, 
  createOrbitGeoModel,
  EarthGeoModel,
  AmbientLight,
  Sun}
from "../containers/ThreeModels"

import {intializeSatObject,
  updateSatPostion,
  alignXaxis2Equinox}
from "../utils/sathelper.js"


var scene, camera, renderer, clock, deltaTime, totalTime; // move to local component?? with import 'three'


var arToolkitSource, arToolkitContext; //from html
var markerRoot1;    // where does it need to be available?
var mesh1;          // where does it need to be available?
var testSatObject;  // where does it need to be available?

//Control parameters
const earthRadius = 6371      //[km]
const cameraAltitude = 40000  //[km]
let sceneScaleFactor = 1 / 10000;         //is 10x the value of 3D visualizer
let satScaleFactor = 200;

const currentTimeStamp   = new Date();

// for satellite model//      //global??
let scaleFactor = 1/40000
console.log("test",scaleFactor)
let satSize = 0.5
let timefactor = 2000
let ARview = {}
let ModelOffset = {}

if (ARview) {
  ModelOffset = {x:0,y:0,z:0}
} else {
  ModelOffset = {x:0,y:0.2,z:0}
}

const initialTimeStamp = new Date()

export const mount = (domElement,sats,ARview_2) => {
  ARview = true
  console.log('we mount here', domElement)
  console.log("we received", sats.length,"satellites")
  initialize(domElement, sats);
  animate();
};


function initialize(domElement, sats) {

  scene = new window.THREE.Scene();

  let ambientLight = new window.THREE.AmbientLight(0xcccccc, 0.5);
  scene.add(ambientLight);

  camera = new window.THREE.Camera();
  camera.up.set( 0, 1, 0 );
  camera.lookAt(0,0,0) 
  scene.add(camera);

  renderer = new window.THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

 
  renderer.setClearColor(new window.THREE.Color("lightgrey"), 0);
  renderer.setSize(680, 480);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0px";
  renderer.domElement.style.left = "0px";
  domElement.appendChild(renderer.domElement);

  console.log(renderer)

  clock = new window.THREE.Clock();
  deltaTime = 0;
  totalTime = 0;

  ////////////////////////////////////////////////////////////
  // setup arToolkitSource
  ////////////////////////////////////////////////////////////

  if (ARview==false){
    arToolkitSource= null
  }
  else{
    arToolkitSource = new window.THREEx.ArToolkitSource({
      sourceType: "webcam",
      // parentElement: domElement
    });

    function onResize() {
      arToolkitSource.onResize();
      arToolkitSource.copySizeTo(renderer.domElement);
      if (arToolkitContext.arController !== null) {
        arToolkitSource.copySizeTo(arToolkitContext.arController.canvas);
      }
    }
    arToolkitSource.init(function onReady() {
      onResize();
    });

    // handle resize event
    window.addEventListener("resize", function() {
      onResize();
    });
  }


  

  ////////////////////////////////////////////////////////////
  // setup arToolkitContext
  ////////////////////////////////////////////////////////////

  // create atToolkitContext
  arToolkitContext = new window.THREEx.ArToolkitContext({
    cameraParametersUrl:
      "https://stemkoski.github.io/AR-Examples/data/camera_para.dat",
    detectionMode: "mono"
  });

  // copy projection matrix to camera when initialization complete
  if (ARview) {
    arToolkitContext.init(function onCompleted() {
      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });
  }
  ////////////////////////////////////////////////////////////
  // setup markerRoots
  ////////////////////////////////////////////////////////////
  // build markerControls
  markerRoot1 = new window.THREE.Group();

  scene.add(markerRoot1);

  let markerControls1 = new window.THREEx.ArMarkerControls(
    arToolkitContext,
    markerRoot1,
    {
      type: "pattern",
      patternUrl: "https://stemkoski.github.io/AR-Examples/data/hiro.patt"
    }
  );

  //////////////////////////////////////////////////////////////////////
  // build model
  ////////////////////////////////////////////////////////////////////////



  addEntities(sats)



  //////////////////////////////////////////////////////////
  let earth = EarthGeoModel(earthRadius,sceneScaleFactor)
  earth.rotation.x = -90 * Math.PI/180
   earth.rotation.y = -90 * Math.PI/180
  // earth = adjustObjectOrientation(earth) //correct for Three.js standard coordinate system (threejs: z towards screen)
  // earth = alignXaxis2Equinox(earth,currentTimeStamp); // align coordinate system with vernal equinox

 console.log(earth)

  earth.position.x = ModelOffset.x;
  earth.position.y = ModelOffset.y;
  earth.position.z = ModelOffset.z;

  if (ARview) {
    markerRoot1.add(earth);
  } else {
    // scene.add(mesh1)        //remove for aR
    // scene.add(testSatObject) 
  }

  let pointLight = new window.THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(0.5, 3, 2);

  // create a mesh to help visualize the position of the light
  pointLight.add(
    new window.THREE.Mesh(
      new window.THREE.SphereBufferGeometry(0.05, 16, 8),
      new window.THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5 })
    )
  );

  markerRoot1.add(pointLight);

  return testSatObject
}


const addEntities =(entities) =>{
  entities.forEach(sat => {

    let satGeoModel = createSatelliteGeoModel(sat.name, satScaleFactor, sceneScaleFactor)
    let satObject = intializeSatObject(sat.name, sat.tle.line1, sat.tle.line2, satGeoModel, sceneScaleFactor)
    satObject = updateSatPostion(satObject, currentTimeStamp, sceneScaleFactor)
    // trackObject(satObject)
    markerRoot1.add(satObject)
    console.log(satObject)
    let orbitGeoModel = createOrbitGeoModel(satObject.userData.satrec,  satObject.name, sceneScaleFactor)  
    console.log(orbitGeoModel)   
    markerRoot1.add(orbitGeoModel)
    // trackObject(orbitGeoModel)
  });
}

function update() {

  if (markerRoot1.visible) {
    // mesh1.rotation.y += 0.01
    //  testSatObject.rotation.y +=0.1
  };   //rotate globe

  // update artoolkit on every frame
  if (ARview) {
    // if (arToolkitSource.ready !== false)
      arToolkitContext.update(arToolkitSource.domElement);
    }
  }

function render() {
  renderer.render(scene, camera);
}

function animate() {
  // console.log(satObject)

  
  function updatedDate(currentDate,deltatime,timefactor){

    let addSeconds = deltatime*timefactor;
    let newDate    = new Date(currentDate.getTime() + (addSeconds * 1000));
  
  return newDate
  }
  

  requestAnimationFrame(animate);
  deltaTime = clock.getDelta();
  totalTime += deltaTime;
  // console.log(deltaTime)
  let currentTimeStampDate = updatedDate(initialTimeStamp,totalTime,timefactor)
  // updateSatPosition(testSatObject,currentTimeStampDate)
    // console.log(currentTimeStampDate)
  update();
  render();
}
