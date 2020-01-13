import React, { Component, Suspense } from "react";
import * as THREE from "three";
import {differenceBy} from 'lodash'

import { SatelliteGeoModel, OrbitGeoModel, EarthGeoModel, AmbientLight} from "../components/ThreeModels"
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
    console.log(this.mount)
    const width = this.mount.clientWidth;   
    const height = this.mount.clientHeight;

    //ADD SCENE
    this.scene = new THREE.Scene();

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 8000);
    this.camera.position.z = 3;
    this.camera.position.set(6, 0, 0);    // view along x-axis
    this.camera.lookAt(0,0,0);                   // looking target
    this.camera.up.set(0,0,1);                   // set camera direction to z=up
    this.scene.add(this.camera);

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

    this.start();
  }

  componentWillUnmount() {
    console.log("component will unmount")

    this.stop();
    this.removeEntities(this.state.removable_items)
    this.mount.removeChild(this.renderer.domElement);
  }
 
  componentDidUpdate(prevProps, prevState){
    console.log("component did update")



    //handle removed elements
    if (prevProps.sats.length>this.props.sats.length) {
      const removedElements = differenceBy(prevProps.sats, this.props.sats)
      this.removeEntities(removedElements, prevState)

     //handle added elements
    } else if (prevProps.sats.length<this.props.sats.length) {
      const addedElements= differenceBy(this.props.sats,prevProps.sats)
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
        this.removeEntityfromList(object)
      })
    })
  }

  addEntities =(entities) =>{
    entities.forEach(sat => {

      let satGeoModel = SatelliteGeoModel(sat.name, scaleFactor*500)
      let satObject = intializeSatObject(sat.name, sat.TLE1, sat.TLE2, satGeoModel, scaleFactor)
      this.scene.add(satObject);
      this.state.removable_items.push(satObject)   //tracking for garbage collection

      let orbitGeoModel = OrbitGeoModel(satObject.userData.satrec, satObject.name,scaleFactor)
      this.scene.add(orbitGeoModel);
      this.state.removable_items.push(orbitGeoModel)   //tracking for garbage collection

    });
  }

  removeEntityfromList = (entity) =>{
    const oldItems = [...this.state.removable_items]
    const updatedItems = oldItems.filter(item=>{return item.name!=entity.name})
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
