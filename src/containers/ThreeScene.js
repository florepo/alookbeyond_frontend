import React, { Component, Suspense } from "react";
import * as THREE from "three";
import {differenceBy} from 'lodash'

import { SatelliteGeoModel, EarthGeoModel, AmbientLight} from "../components/ThreeModels";

import { intializeSatObject } from "../utils/sathelper.js";
import { sgp4, twoline2satrec, propagate, gstime } from "satellite.js";

//Geometry control parameters
let scaleFactor = 1 / 4000;
let satScaleFactor = 0.6;

class ThreeScene extends Component {
  constructor(props) {
    super(props);
    this.state = {removable_items: []};
  }

  componentDidMount() {
    //get canvas size
    const width = 400; //this.mount.clientWidth;      change here for size changes of render canvas!
    const height = 400; //this.mount.clientHeight;

    //ADD SCENE
    this.scene = new THREE.Scene();

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 3;

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#000000");
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    //ADD LIGHTSOURCE
    let ambientLight = AmbientLight()
    this.scene.add(ambientLight);       
    this.state.removable_items.push(ambientLight)   //tracking for garbage collection
    
    //Add Earth
    let earth = EarthGeoModel(1000*scaleFactor)
    this.scene.add(earth);       
    this.state.removable_items.push(earth)   //tracking for garbage collection

    //ADD Satellites
    // this.props.sats.map(sat => {
    //   let satGeoModel = SatelliteGeoModel(sat.name, scaleFactor*500)
    //   let satObject = intializeSatObject(sat.name, sat.TLE1, sat.TLE2, satGeoModel, scaleFactor)

    //   this.scene.add(satObject);
    //   this.state.removable_items.push(satObject)   //tracking for garbage collection
    // });

    this.start();
  }

  componentWillUnmount() {
    this.stop();

    this.state.removable_items.forEach(element=>{
      let entity = this.scene.getObjectByName(element.name)
      this.removeEntityfromScene(entity) //remove from scene
      this.removeEntityFromMemory(entity) //remove from memory (using .dispose)
    })

    this.mount.removeChild(this.renderer.domElement);
  }
 
  componentDidUpdate(prevProps, prevState){
    console.log("component did update")

    //handle removed elements
    if (prevProps.sats.length>this.props.sats.length){
      console.log("handle removign elements")
      const removedElements= differenceBy(prevProps.sats, this.props.sats)
      console.log("removed",removedElements)
      removedElements.forEach(element=>{
        let entity = this.scene.getObjectByName(element.name)
        this.removeEntityfromScene(entity)
        this.removeEntityFromMemory(entity) //remove from memory (using .dispose)

        if (prevState==this.state) { this.removeItemfromList(element)}
       
      })
     
    //handle added elements
    } else if (prevProps.sats.length<this.props.sats.length){
      console.log("handling adding elements")
      const addedElements= differenceBy(this.props.sats,prevProps.sats)
      console.log("added",addedElements)
      //dynamically create and add satellite objects based on selection
      addedElements.forEach(sat => {
        let satGeoModel = SatelliteGeoModel(sat.name, scaleFactor*500)
        let satObject = intializeSatObject(sat.name, sat.TLE1, sat.TLE2, satGeoModel, scaleFactor)

        this.scene.add(satObject);
        this.state.removable_items.push(satObject)   //tracking for garbage collection
      });

    } else
    { console.log("equal")}
    this.renderScene()
  }

  removeItemfromList = (entity) =>{
    console.log("entity to be removed from list:",entity.name)
    const currentItems = [...this.state.removable_items]
    const newItems = currentItems.filter(item=>{return item.name!=entity.name})
    this.setState({removable_items: newItems})
  }

  removeEntityfromScene = (entity) => {
    console.log("entity to be removed:",entity.name)
    this.scene.remove( entity );
    this.renderer.render(this.scene, this.camera);
  }

  removeEntityFromMemory =(entity) =>{
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
      <div
        style={{ width: "100%", height: "100%" }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default ThreeScene;
