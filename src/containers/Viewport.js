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
from "./ThreeModels"

import {intializeSatObject,
        updateSatPostion,
        alignXaxis2Equinox}
from "../utils/sathelper.js"

//Control parameters
const earthRadius = 6371      //[km]
const cameraAltitude = 40000  //[km]
let sceneScaleFactor = 1 / 1000;
let satScaleFactor = 200;

const currentTimeStamp   = new Date();

class Viewport extends Component {
  constructor(props) {
    super(props)
    this.state = {removable_items: []}
  }

  componentDidMount() {
    console.log("Three.js canvas mounted here:", this.canvas)
    this.initialize()
    this.start();

  }

  componentWillUnmount() {
    this.cleanUp()
  }
 
  componentDidUpdate(prevProps, prevState){
    console.log("re-render viewport")
    this.trackPropsChangesAndRerender(prevProps, prevState)

  }
  
  initialize = () => {

    //GET CANVAS DIMENSIONS
    let height = this.canvas.clientHeight;
    let width = this.canvas.clientWidth;   

    //SET UP SCENE, CAMERA, RENDERER, AMBIENT LIGHT
    this.setupScene(height, width)

    //SET WINDOW RESIZE LISTENER AND UPDATE RENDERER AND CAMERA BASED ON CANVAS SIZE
    window.addEventListener("resize", this.updateViewportDimensions);

    //ADD SUN
    let sun = Sun()
    this.scene.add(sun)
    // this.trackObject(sun)

    //ADD EARTH
    let earth = EarthGeoModel(earthRadius,sceneScaleFactor)
    earth = adjustObjectOrientation(earth) //correct for Three.js standard coordinate system (threejs: z towards screen)
    this.scene.add(earth)
  }

  
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  animate = () => {
    this.renderScene();
    this.controls.update(); // required if controls.enableDamping or controls.autoRotate are set to true
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  updateViewportDimensions = () => {
    this.renderer.setSize(this.canvas.clientWidth,this.canvas.clientHeight);
    this.camera.aspect = this.canvas.clientWidth /this.canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.controls.update()
  };

  //--------------------------------------

  trackPropsChangesAndRerender = (prevProps, prevState) =>{
    console.log("previous sats no.",prevProps.sats.length)
    console.log("current sats no.",this.props.sats.length)
    const removedSatellites = differenceBy(prevProps.sats, this.props.sats)
    const addedSatellites = differenceBy(this.props.sats, prevProps.sats,)
    console.log("removed sats",removedSatellites)
    console.log("added sats",addedSatellites)
    this.removeEntities(removedSatellites)
    this.addEntities(addedSatellites)
    this.renderer.render(this.scene, this.camera)

  }


  cleanUp = () =>{
    window.removeEventListener("resize", this.updateViewportDimensions);
    this.stop();
    this.removeEntities(this.state.removable_items)
    this.canvas.removeChild(this.renderer.domElement);
  }

  addEntities =(entities) =>{
    entities.forEach(sat => {

      let satGeoModel = createSatelliteGeoModel(sat.name, satScaleFactor, sceneScaleFactor)
      let satObject = intializeSatObject(sat.name, sat.line1, sat.line2, satGeoModel, sceneScaleFactor)
      satObject = updateSatPostion(satObject, currentTimeStamp, sceneScaleFactor)
      this.trackObject(satObject)
      this.scene.add(satObject)
      let orbitGeoModel = createOrbitGeoModel(satObject.userData.satrec,  satObject.name, sceneScaleFactor)  
      this.scene.add(orbitGeoModel)
      this.trackObject(orbitGeoModel)
    });
  }

  trackObject = (object) => {
    // console.log("tracking: ", object)

    let trackingList = [...this.state.removable_items]
    // console.log(trackingList.length)
    trackingList.push(object)
    // console.log(trackingList.length)
    this.setState({removable_items: trackingList})
  }

  removeEntities = (removedEntities)  => {
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

    this.scene.remove( entity );
    this.renderer.render(this.scene, this.camera);
  }

  removeEntityFromMemory = (entity) =>{
    // console.log("entity to be clean up:",entity.name)
    entity.material.dispose();
    entity.geometry.dispose();
    //possibly add texture.dispose()
  }

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  render() {
    return (
      <div className = "viewport" ref={mount => {this.canvas = mount;}} />
      ///"canvas" we will the div-tag we will be mounting and attaching the Three.js scene
    );
  }


  setupScene = (height, width) => {
    //ADD SCENE
    this.scene = new THREE.Scene();

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 8000);
    this.camera.position.z = (cameraAltitude-earthRadius)*sceneScaleFactor;
    this.camera.lookAt(0,0,0)         //orbit controls
    this.camera.up.set( 0, 1, 0 );
    // this.trackObject(this.camera, this.scene) //doesnt capture it yet

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    console.log("we add renderer here", this.canvas)
    this.canvas.appendChild(this.renderer.domElement);

    //ADD ORBITCONTROLS
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enabled = true
    this.controls.minDistance = 3 * earthRadius*sceneScaleFactor
    this.controls.maxDistance = 20 * earthRadius*sceneScaleFactor
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.1;

    //ADD LIGHTSOURCES
    let ambientLight = AmbientLight()
    this.scene.add(ambientLight)
    // this.trackObject(ambientLight, this.scene)
  }

}

export default Viewport;
