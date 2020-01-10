import React, { Component, Suspense } from "react";
import * as THREE from "three";
import {isEqual, differenceBy} from 'lodash'

import { SatelliteGeoModel, EarthGeoModel } from "../components/ThreeModels";
import { intializeSatObject } from "../utils/sathelper.js";

import { sgp4, twoline2satrec, propagate, gstime } from "satellite.js";

//Geometry control parameters
let scaleFactor = 1 / 4000;
let satScaleFactor = 1 / 16;

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
    this.camera.position.z = 4;

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#000000");
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    //Add Earth
    let earth = EarthGeoModel(1000*scaleFactor)
    this.scene.add(earth);       
    this.state.removable_items.push(earth)   //track for garbage collection

    //dynamically create and add satellite objects based on selection
    this.props.sats.map(sat => {
      let satGeoModel = SatelliteGeoModel(sat.name, scaleFactor*500)
      let satObject = intializeSatObject(sat.name, sat.TLE1, sat.TLE2, satGeoModel, scaleFactor)
      this.scene.add(satObject);
      this.state.removable_items.push(satObject)   //track for garbage collection
    });

    this.start();
  }

  componentWillUnmount() {
    this.stop();

    this.mount.removeChild(this.renderer.domElement);
  }
 
  componentDidUpdate(prevProps, prevState){
    console.log("component did update")

    //handle removed elements
    if (prevProps.sats.length>this.props.sats.length){

      let removedElements= differenceBy(prevProps.sats, this.props.sats)

      removedElements.forEach(element=>{
        let entity = this.scene.getObjectByName(element.name)
        this.removeEntityfromScene(entity) //remove from scene
        this.removeEntityFromMemory(entity) //remove from memory
      })
     
    //handle added elements
    } else if (prevProps.sats.length<this.props.sats.length){
      console.log(prevProps.sats-this.props.sats)
      console.log("adding not implemented yet")

    } else
    { console.log("equal")}



  }




  removeEntityfromScene = (entity) => {
    this.scene.remove( entity );
    this.renderScene();
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





  createSatelliteObject(name, tle1, tle2) {
    let TimeSinceEpoch = 0; //[min]

    let sat = SatelliteGeoModel();  //get three.js geometry model
    console.log('old',sat)
    let satrec = twoline2satrec(tle1, tle2);
    let positioAndVelocity = sgp4(satrec, TimeSinceEpoch);

    sat.position.set(
      positioAndVelocity.position.x * scaleFactor, //map ECI to ThreeJS coord system > x(js) = z(ECI), y(js) = x(ECI), z(js)=y(ECI)
      positioAndVelocity.position.y * scaleFactor,
      positioAndVelocity.position.z * scaleFactor
    );

    sat.userData.satrec = satrec;
    sat.userData.name = name;

    return sat;
  }


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
