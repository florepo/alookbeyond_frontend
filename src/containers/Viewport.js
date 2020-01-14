import React, { Component, Suspense } from "react";
import * as THREE from "three";
import OrbitControls from 'threejs-orbit-controls'
import {differenceBy} from 'lodash'

import {
  createSatelliteGeoModel, 
  createOrbitGeoModel,
  EarthGeoModel,
  AmbientLight,
  Sun}
from "../components/ThreeModels"

import {
  intializeSatObject,
  updateSatPostion
} from "../utils/sathelper.js"

//Control parameters
const earthRadius = 6371      //[km]
const cameraAltitude = 30000  //[km]
let sceneScaleFactor = 1 / 1000;
let satScaleFactor = 200;

const currentTimeStamp   = new Date();

class Viewport extends Component {
  constructor(props) {
    super(props);
    this.state = {removable_items: []};
  }

  componentDidMount() {
    //get canvas size
    console.log(this.mount)
    const width = this.mount.clientWidth;   
    const height = this.mount.clientHeight;


    //ADD SCENE
    this.scene = new THREE.Scene();

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 8000);
    this.camera.position.z = (cameraAltitude-earthRadius)*sceneScaleFactor;
    this.camera.lookAt(0,0,0);                   // looking target
    this.camera.up.set(0,0,1);  
    this.addToSceneAndTrack(this.camera, this.scene)                 // set camera direction to z=up

    //ADD ORBITCONTROLS
    this.controls = new OrbitControls(this.camera)
    this.controls.enabled = true
    this.controls.minDistance = 1.5 * earthRadius*sceneScaleFactor
    this.controls.maxDistance = 10 * earthRadius*sceneScaleFactor

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#000000");
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    //ADD LIGHTSOURCES
    let ambientLight = AmbientLight()
    this.addToSceneAndTrack(ambientLight, this.scene)   
    let sun = Sun()
    this.addToSceneAndTrack(sun, this.scene)

    //ADD EARTH
    let earth = EarthGeoModel(earthRadius,sceneScaleFactor)
    this.addToSceneAndTrack(earth, this.scene)   //tracking for garbage collection

    //ADD SATELLITE FLEET CONTAINER
    let satGroup = THREE.Group
    this.addToSceneAndTrack(earth, this.scene)   //tracking for garbage collection

    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.removeEntities(this.state.removable_items)
    this.mount.removeChild(this.renderer.domElement);
  }
 
  componentDidUpdate(prevProps, prevState){
    //handle removed elements
    if (prevProps.sats.length>this.props.sats.length) {
      const removedElements = differenceBy(prevProps.sats, this.props.sats)
      this.removeEntities(removedElements, prevState)
     //handle added elements
    } else if (prevProps.sats.length<this.props.sats.length) {
      const addedElements = differenceBy(this.props.sats,prevProps.sats)
      this.addEntities(addedElements)
    } else {}
    //re-render scene
    this.renderer.render(this.scene, this.camera);
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

  addEntities =(entities) =>{
    entities.forEach(sat => {
      const satGeoModel = createSatelliteGeoModel(sat.name, satScaleFactor, sceneScaleFactor)
      let satObject = intializeSatObject(sat.name, sat.tle.line1, sat.tle.line2, satGeoModel, sceneScaleFactor)
      const orbitGeoModel = createOrbitGeoModel(satObject.userData.satrec, satObject.name,sceneScaleFactor)
      const updatedSatObject = updateSatPostion(satObject, currentTimeStamp, sceneScaleFactor)
      this.addToSceneAndTrack(updatedSatObject, this.scene)
      this.addToSceneAndTrack(orbitGeoModel, this.scene)

    });
  }

  removeFromWatchList = (entity) =>{
    const oldItems = [...this.state.removable_items]
    const updatedItems = oldItems.filter(item=>{return item.name!=entity.name})
    this.setState({removable_items: updatedItems})
  }

  addToSceneAndTrack = (object, scene) => {
    let trackingList = [...this.state.removable_items] 
    trackingList.push(object)
    this.setState({removable_items: trackingList})
    scene.add(object)
    return scene
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
