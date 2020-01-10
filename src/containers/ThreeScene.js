import React, { Component, Suspense } from "react";

// import { Canvas, useThree } from "react-three-fiber";
// import Sphere from "../components/Sphere";
import { Cube } from "../components/ThreeModels";

import * as THREE from "three";

// import createEarth from '../components/Earth'

import { sgp4, twoline2satrec, propagate, gstime } from "satellite.js";

let iniPosition1 = { id: 1, x: 0.0, y: 2.0, z: 1.5 }; //
let iniPosition2 = { id: 2, x: 0.8, y: 1.8, z: 1.2 }; //

let positions = [iniPosition1, iniPosition2];

let scaleFactor = 1 / 3000;
let satScaleFactor = 1 / 16;

class ThreeScene extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
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

    //EARTH MODEL
    // let geometry1 = new THREE.SphereGeometry(0.5, 32, 32);

    // let loader = new THREE.TextureLoader();
    // // let texture = loader.load(
    // //   "https://stemkoski.github.io/AR-Examples/images/earth-sphere.jpg",
    // //   this.renderer
    // // );

    // let material1 = new THREE.MeshBasicMaterial({
    //   color: 0xffffff,
    //   opacity: 0.5
    // });

    // let earth = new THREE.Mesh(geometry1, material1);
    // this.scene.add(earth);

    //Dynamically create satellite objects based on selection
    this.props.sats.map(sat => {
      let satellite = this.createSatelliteObject(sat.name, sat.TLE1, sat.TLE2);
      this.scene.add(satellite);
    });

    // console.log(Cube);
    // this.scene.add(Cube);

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
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  createSatelliteGeometry = () => {};

  createSatelliteObject(name, tle1, tle2) {
    // console.log('create Satellite: ',satDataContainer.name)
    // console.log('sat data',satDataContainer)
    let TsE = 0; //[min]
    let pAv = {};
    let satrec = {};

    // let sat = this.createSatelliteGeometry();
    let sat = Cube();

    // // let sat = () => {
    // let geometry = new THREE.BoxGeometry(1, 1, 1);
    // let material = new THREE.MeshBasicMaterial({ color: "#433F81" });
    // let cube = new THREE.Mesh(geometry, material);
      // return cube}

      // let sat = cube

    satrec = twoline2satrec(tle1, tle2);
    pAv = sgp4(satrec, TsE);

    // sat.position.set(
    //   pAv.position.x * scaleFactor, //map ECI to ThreeJS coord system > x(js) = z(ECI), y(js) = x(ECI), z(js)=y(ECI)
    //   pAv.position.y * scaleFactor,
    //   pAv.position.z * scaleFactor
    // );
    //  console.log('sat position initial', sat.position)

    // sat.userData.satrec = satrec;
    // sat.userData.name = name;

    return sat;
  }

  updateSatPosition(satContainer, date) {
    let pAv = propagate(satContainer.userData.satrec, date);

    satContainer.position.set(
      pAv.position.x * scaleFactor,
      pAv.position.y * scaleFactor,
      pAv.position.z * scaleFactor
    );

    // console.log('sat position updated', satContainer.position)

    return satContainer;
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
