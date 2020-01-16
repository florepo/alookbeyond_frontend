import * as THREE from "three";
import "./ar/aframe-ar.js"
import OrbitControls from "threejs-orbit-controls";

import { differenceBy } from "lodash";

import {
  adjustObjectOrientation,
  adjustGlobalOrientation
} from "../utils/scenehelper.js";

import {
  createSatelliteGeoModel,
  createOrbitGeoModel,
  EarthGeoModel,
  AmbientLight,
  Sun
} from "./ThreeModels";

//Control parameters
const earthRadius = 6371; //[km]
const cameraAltitude = 40000; //[km]
const sceneScaleFactor = 1 / 1000;
const satScaleFactor = 200;
const currentTimeStamp = new Date();

// AR Parameters
var arToolkitSource, arToolkitContext; //from html
var markerRoot1; // where does it need to be available?
var mesh1; // where does it need to be available?
var testSatObject; // where does it need to be available?
let ARview = true;
let ModelOffset = {};

if (ARview) {
  ModelOffset = { x: 0, y: 0, z: 0 };
} else {
  ModelOffset = { x: 0, y: 0.2, z: 0 };
}


export const ViewportAR = canvas => {


  console.log("we mount here", canvas);

  if (canvas) {
    //GET CANVAS DIMENSIONS
    let height = canvas.clientHeight;
    let width = canvas.clientWidth;

    //SET UP SCENE, CAMERA, RENDERER, AMBIENTLIGHT
    let current = setupScene(height, width, canvas);

     //SET WINDOW RESIZE LISTENER AND UPDATE RENDERER AND CAMERA BASED ON CANVAS SIZE
    window.addEventListener("resize", updateViewportDimensions(current));

    // ADD CONTENT AND MANAGE RENDERER
    setupContent(canvas, current);
  }
};

const setupContent = (domElement, current) => {
  current = initialize(domElement, current);
  animate(current);
};

const initialize = (canvas, current) => {
  console.log(ARview)

  //ADD SUN
  let sun = Sun();
  current.scene.add(sun);

  //ADD EARTH
  let earth = EarthGeoModel(earthRadius, sceneScaleFactor);
  console.log(earth);
  current.scene.add(earth);

  ////////////////////////////////////////////////////////////
  // setup arToolkitSource
  ////////////////////////////////////////////////////////////

  // if (ARview==false){
  //   arToolkitSource= null
  // }
  // else{
  //   arToolkitSource = new window.THREEx.ArToolkitSource({
  //     sourceType: "webcam",
  //     parentElement: canvas
  //   });

  //   function onResize() {
  //     arToolkitSource.onResize();
  //     arToolkitSource.copySizeTo(current.renderer.canvas);
  //     if (arToolkitContext.arController !== null) {
  //       arToolkitSource.copySizeTo(arToolkitContext.arController.canvas);
  //     }
  //   }
  //   arToolkitSource.init(function onReady() {
  //     onResize();
  //   });

  //   // handle resize event
  //   window.addEventListener("resize", function() {
  //     onResize();
  //   });
  // }


  

  ////////////////////////////////////////////////////////////
  // setup arToolkitContext
  ////////////////////////////////////////////////////////////

  // // create atToolkitContext
  // arToolkitContext = new window.THREEx.ArToolkitContext({
  //   cameraParametersUrl:
  //     "https://stemkoski.github.io/AR-Examples/data/camera_para.dat",
  //   detectionMode: "mono"
  // });

  // // copy projection matrix to camera when initialization complete
  // if (ARview) {
  //   arToolkitContext.init(function onCompleted() {
  //     current.camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
  //   });
  // }
  ////////////////////////////////////////////////////////////
  // setup markerRoots
  ////////////////////////////////////////////////////////////
  // // build markerControls
  // markerRoot1 = new window.THREE.Group();

  // current.scene.add(markerRoot1);

  // let markerControls1 = new window.THREEx.ArMarkerControls(
  //   arToolkitContext,
  //   markerRoot1,
  //   {
  //     type: "pattern",
  //     patternUrl: "https://stemkoski.github.io/AR-Examples/data/hiro.patt"
  //   }
  // );



  return current;
};

// const start = () =>{}

const animate = current => {
  renderScene(current);
  //   // controls.update(); // required if controls.enableDamping or controls.autoRotate are set to true
  //   window.requestAnimationFrame(animate(current));
};

const renderScene = current => {
  current.renderer.render(current.scene, current.camera);
};

const updateViewportDimensions = current => {
  console.log(current)
    current.renderer.setSize(current.canvas.clientWidth, current.canvas.clientHeight);
    current.camera.aspect = current.canvas.clientWidth /current.canvas.clientHeight;
    current.camera.updateProjectionMatrix();
    // current.controls.update()
};



//Working

const setupScene = (height, width, canvas) => {

  // ADD SCENE
  let scene = new THREE.Scene();

  //ADD CAMERA
  let camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 8000);
  camera.position.z = (cameraAltitude - earthRadius) * sceneScaleFactor;
  camera.lookAt(0, 0, 0); //orbit controls

  //ADD RENDERER
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  canvas.appendChild(renderer.domElement);

  //ADD ORBITCONTROLS
  // let controls = new OrbitControls(this.camera, this.renderer.domElement)
  // controls.enabled = true
  // controls.minDistance = 3 * earthRadius*sceneScaleFactor
  // controls.maxDistance = 20 * earthRadius*sceneScaleFactor
  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 0.5;

  //ADD LIGHTSOURCES
  let ambientLight = AmbientLight();
  scene.add(ambientLight);
  // this.addToSceneAndTrack(ambientLight, this.scene)
  return { scene, renderer, camera, canvas };
};
