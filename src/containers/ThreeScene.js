import React, { Component, Suspense } from "react";

// import { Canvas, useThree } from "react-three-fiber";
// import Sphere from "../components/Sphere";
import {Cube} from "../components/Cube2";

import * as THREE from "three";

// import createEarth from '../components/Earth'

import { sgp4, twoline2satrec, propagate, gstime } from "satellite.js";

let iniPosition1 = { id: 1, x: 0.0, y: 2.0, z: 1.5 }; //
let iniPosition2 = { id: 2, x: 0.8, y: 1.8, z: 1.2 }; //

let positions = [iniPosition1, iniPosition2];

class ThreeScene extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const width = 400 //this.mount.clientWidth;      change here for size changes of render canvas!
    const height = 400 //this.mount.clientHeight;

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
    //ADD CUBE
    console.log(this.props.sats)

  //Dynamically create cubes for satellites
    this.props.sats.map(sat=>{

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: "#433F81" });
      let cube = new THREE.Mesh(geometry, material)
      this.scene.add(cube);
    })
  
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "#433F81" });
    this.cube = new THREE.Mesh(geometry, material)
  
    console.log(Cube)
    this.scene.add(this.cube);

    // this.earth = createEarth()

    // this.scene.add(this.earth);

    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
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
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
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
