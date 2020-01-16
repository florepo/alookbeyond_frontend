// import React, { useEffect, useRef, useState } from "react";
import {sgp4, twoline2satrec, propagate, gstime} from "satellite.js"
// import {Scene} from 'react-fiber-three'

var scene, camera, renderer, clock, deltaTime, totalTime; // move to local component?? with import 'three'


var arToolkitSource, arToolkitContext; //from html
var markerRoot1;    // where does it need to be available?
var mesh1;          // where does it need to be available?
var testSatObject;  // where does it need to be available?

// for satellite model//      //global??
let scaleFactor = 1/10000
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

export const mount = (domElement,ARview_2) => {
  ARview = true
  console.log('we mount here', ARview_2)
  initialize(domElement);
  animate();
};


function initialize(domElement) {

  scene = new window.THREE.Scene();

  let ambientLight = new window.THREE.AmbientLight(0xcccccc, 0.5);
  scene.add(ambientLight);

  camera = new window.THREE.Camera();
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
      parentElement: domElement
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

  // add satellite
  let TLEdata=[
    {
    name: 'LightSail 2',
    TLE1: '1 44420U 19036AC  20008.13579535  .00003678  00000-0  80410-3 0  9991',
    TLE2: '2 44420  24.0061  45.8725 0019024 144.4109 215.7714 14.54048754 26792'
    },
    {
    name: 'ISS',
    TLE1: '1 25544U 98067A   20008.29189198  .00001108  00000-0  27822-4 0  9992',
    TLE2: '2 25544  51.6455  64.5943 0005137 111.2659   7.8376 15.49548321207079'
    },
  ]
  
  function createSatelliteModel(){

    let sat = new window.THREE.Object3D();
  
    let cubeMat = new window.THREE.MeshPhongMaterial({
      color: 0xd3d3d3,
      opacity: 1,
      transparent: true,
      wireframe: false
    });
    let cubeGeo = new window.THREE.BoxGeometry(satSize / 8, satSize / 8, satSize / 8);
    let cube = new window.THREE.Mesh(cubeGeo, cubeMat);
  
    cube.name = "cube";

    cube.position.x = ModelOffset.x
    cube.position.y = ModelOffset.y
    cube.position.z = ModelOffset.z
  
    sat.add(cube);

  
    return sat;
  }

   
  function createSatellite(satDataContainer){
   
    // console.log('create Satellite: ',satDataContainer.name)
    // console.log('sat data',satDataContainer)
    let TsE    = 0; //[min]
    let pAv = {}
    let satrec = {}
  
    let sat = new createSatelliteModel();
    console.log('here', sat)

    satrec  = twoline2satrec(satDataContainer.TLE1, satDataContainer.TLE2);
    pAv     = sgp4(satrec, TsE);
  
    sat.position.set( pAv.position.x*scaleFactor,     //map ECI to ThreeJS coord system > x(js) = z(ECI), y(js) = x(ECI), z(js)=y(ECI)
                      pAv.position.y*scaleFactor,
                      pAv.position.z*scaleFactor);   
   console.log('sat position initial', sat.position)

    sat.userData.satrec  = satrec;
  
  return sat;
}


function alignXaxis2Equinox(object,date){

  var gmst = gstime(date);  //GMST rad is same as GHA of Aries (Vernal Equinox)
  console.log('gmst',gmst)
  console.log('ory',object.rotation.y)
  object.rotation.y = object.rotation.y + gmst //Tilting the earth

  return object;

};


  //add satellites
  // console.log(TLEdata[1])
  // let testSatModel = createSatelliteModel()
  // console.log('model type',testSatModel.type)
  // console.log('model',testSatModel)
  // console.log('model intitial',testSatModel.position)
  testSatObject = createSatellite(TLEdata[1])
  // console.log('object type',testSatObject.type)
  // console.log('object',testSatObject)
  // console.log('model intitial',testSatObject.position)
  // updateSatPosition(testSatObject, currentDate)



  //////////////////////////////////////////////////////////


  let geometry1 = new window.THREE.SphereGeometry(0.5, 32, 32);

  let loader = new window.THREE.TextureLoader();
  let texture = loader.load(
    "https://stemkoski.github.io/AR-Examples/images/earth-sphere.jpg",
    render
  );
  let material1 = new window.THREE.MeshLambertMaterial({
    map: texture,
    opacity: 0.5
  });

  mesh1 = new window.THREE.Mesh(geometry1, material1);
  // earth = alignXaxis2Equinox(earth,currentDate);

  mesh1.position.x = ModelOffset.x;
  mesh1.position.y = ModelOffset.y;
  mesh1.position.z = ModelOffset.z;

  if (ARview) {
    markerRoot1.add(mesh1);
    markerRoot1.add(testSatObject)
  } else {
    scene.add(mesh1)        //remove for aR
    scene.add(testSatObject) 
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


function update() {

  if (markerRoot1.visible) {
    // mesh1.rotation.y += 0.01
     testSatObject.rotation.y +=0.1
  };   //rotate globe

  // update artoolkit on every frame
  if (ARview) {
    if (arToolkitSource.ready !== false)
      arToolkitContext.update(arToolkitSource.domElement);
    }
  }

function render() {
  renderer.render(scene, camera);
}

function animate() {
  // console.log(satObject)

  function updateSatPosition(satContainer,date){

    let pAv = propagate(satContainer.userData.satrec,date);
  
    satContainer.position.set(pAv.position.x*scaleFactor,     
                              pAv.position.y*scaleFactor,
                              pAv.position.z*scaleFactor); 
  
    // console.log('sat position updated', satContainer.position)
  
    return satContainer;
  }

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
  updateSatPosition(testSatObject,currentTimeStampDate)
  // console.log(currentTimeStampDate)
  update();
  render();
}
