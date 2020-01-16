import React, { Component} from "react";

import * as THREE from "three";
import OrbitControls from 'threejs-orbit-controls'

import {differenceBy} from 'lodash'

import {adjustObjectOrientation,
        adjustGlobalOrientation}
from "../utils/scenehelper.js"

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

//Control parameters
const earthRadius = 6371      //[km]
const cameraAltitude = 40000  //[km]
let sceneScaleFactor = 1 / 1000;
let satScaleFactor = 200;

// AR Parameters
var arToolkitSource, arToolkitContext; //from html
var markerRoot1;    // where does it need to be available?
var mesh1;          // where does it need to be available?
var testSatObject;  // where does it need to be available?
let ARview = true
let ModelOffset = {}

if (ARview) {
  ModelOffset = {x:0,y:0,z:0}
} else {
  ModelOffset = {x:0,y:0.2,z:0}
}

const currentTimeStamp   = new Date();

class Viewport extends Component {
  constructor(props) {
    super(props)
    this.state = {removable_items: []}
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateViewportDimensions);

    //get canvas siz
    let width = this.mount.clientWidth;   
    let height = this.mount.clientHeight;

    //ADD SCENE
    this.scene = new THREE.Scene();

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 8000);
    this.camera.position.z = (cameraAltitude-earthRadius)*sceneScaleFactor;
    this.camera.lookAt(0,0,0)         //orbit controls
    this.addToSceneAndTrack(this.camera, this.scene) //doesnt capture it yet

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    //ADD ORBITCONTROLS
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enabled = true
    this.controls.minDistance = 3 * earthRadius*sceneScaleFactor
    this.controls.maxDistance = 20 * earthRadius*sceneScaleFactor
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.5;
  
    //ADD LIGHTSOURCES
    let ambientLight = AmbientLight()
    this.addToSceneAndTrack(ambientLight, this.scene)

    let sun = Sun()
    this.addToSceneAndTrack(sun, this.scene)

    //ADD EARTH
    let earth = EarthGeoModel(earthRadius,sceneScaleFactor)
    earth = adjustObjectOrientation(earth) //correct for Three.js standard coordinate system (threejs: z towards screen)
    // earth = alignXaxis2Equinox(earth,currentTimeStamp); // align coordinate system with vernal equinox
    // this.addToSceneAndTrack(earth, this.scene)   //tracking for garbage collection

    // let axis = new THREE.AxesHelper(15);
    // this.scene.add(axis);
    // this.addToSceneAndTrack(ambientLight, this.scene)


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
      arToolkitSource.copySizeTo(this.renderer.domElement);
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
      this.camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });
  }
  ////////////////////////////////////////////////////////////
  // setup markerRoots
  ////////////////////////////////////////////////////////////
  // build markerControls
  markerRoot1 = new window.THREE.Group();

  this.scene.add(markerRoot1);

  let markerControls1 = new window.THREEx.ArMarkerControls(
    arToolkitContext,
    markerRoot1,
    {
      type: "pattern",
      patternUrl: "https://stemkoski.github.io/AR-Examples/data/hiro.patt"
    }
  );

  if (ARview) {
    markerRoot1.add(earth);
    markerRoot1.add(ambientLight);
  } else {
    this.scene.add(earth)        //remove for aR
  }



    //START
    this.start();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateViewportDimensions);
    this.stop();
    this.removeEntities(this.state.removable_items)
    this.mount.removeChild(this.renderer.domElement);
  }
 
  componentDidUpdate(prevProps, prevState){
    console.log("props difference", prevProps.sats.length-this.props.sats.length)
    //handle removed elements
    if (prevProps.sats.length>this.props.sats.length) {
      const removedElements = differenceBy(prevProps.sats, this.props.sats)
      this.removeEntities(removedElements, prevState)
     //handle added elements
    } else if (prevProps.sats.length<this.props.sats.length) {
      const addedElements = differenceBy(this.props.sats,prevProps.sats)
      console.log(addedElements)
      this.addEntities(addedElements)
      console.log("elements added")
    } else {}
    console.log("re-render scene")
    this.renderer.render(this.scene, this.camera);
  }

  updateViewportDimensions = () => {
    this.renderer.setSize(this.mount.clientWidth,this.mount.clientHeight);
    this.camera.aspect = this.mount.children[0].clientWidth /this.mount.children[0].clientHeight;
    this.camera.updateProjectionMatrix();
    this.controls.update()
  };

  addEntities =(entities) =>{
    entities.forEach(sat => {

      let satGeoModel = createSatelliteGeoModel(sat.name, satScaleFactor, sceneScaleFactor)
      let satObject = intializeSatObject(sat.name, sat.tle.line1, sat.tle.line2, satGeoModel, sceneScaleFactor)
      satObject = updateSatPostion(satObject, currentTimeStamp, sceneScaleFactor)
      this.addToSceneAndTrack(satObject, this.scene)
      console.log(satObject)
      let orbitGeoModel = createOrbitGeoModel(satObject.userData.satrec,  satObject.name, sceneScaleFactor)  
      console.log(orbitGeoModel)   
      this.addToSceneAndTrack(orbitGeoModel, this.scene)
    });
  }

  addToSceneAndTrack = (object, scene) => {
    // console.log("tracking: ", object)
    scene.add(object)
    let trackingList = [...this.state.removable_items]
    // console.log(trackingList.length)
    trackingList.push(object)
    // console.log(trackingList.length)
    this.setState({removable_items: trackingList})
    return scene
  }

  removeEntities = (removedEntities, prevState = null)  => {
    let entitiesNames = removedEntities.map(entity => entity.name)

    let dependencies = entitiesNames.map(entityName=>{
      let children =  this.scene.children //breakout in variable required for enumaration
      return children.filter( child => child.name === entityName)
    })

    dependencies.forEach( dependecy => {
      dependecy.forEach(object=>{
        this.removeEntityfromScene(object)
        this.removeEntityFromMemory(object)
        this.removeFromWatchList(object)
      })
    })
  }

  removeFromWatchList = (entity) =>{
    const oldItems = [...this.state.removable_items]
    const updatedItems = oldItems.filter( item => {return item.name != entity.name} )
    this.setState({removable_items: updatedItems})
  }

 

  removeEntityfromScene = (entity) => {
    console.log("entity to be removed:",entity.name)
    this.scene.remove( entity );
    this.renderer.render(this.scene, this.camera);
  }

  removeEntityFromMemory = (entity) =>{
    console.log("entity to be clean up:",entity.name)
    entity.material.dispose();
    entity.geometry.dispose();
    //possibly add texture.dispose()
  }


  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    this.renderScene();
    this.controls.update(); // required if controls.enableDamping or controls.autoRotate are set to true
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };


  render() {
    return (
      <div className = "viewport"ref={mount => {this.mount = mount;}} />
    );
  }
}

export default Viewport;
