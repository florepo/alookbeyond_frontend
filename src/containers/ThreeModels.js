import * as THREE from "three";
import {FRONTEND_URL} from '../adapters/api'
import { sgp4, twoline2satrec, propagate, gstime } from "satellite.js";
import {adjustGlobalOrientation} from '../utils/scenehelper.js'

export const createSatelliteGeoModel = (name="unknown", satScaleFactor=1, scaleFactor=1, )=> {

    const size = satScaleFactor*scaleFactor
    console.log(size)
    const identifier = name
    // let geometry = new THREE.BoxGeometry(size, size, size);
    let geometry = new THREE.SphereGeometry(size, 32, 32);
    geometry.name=identifier
    // let material = new THREE.MeshBasicMaterial({ color: "#42f54e"});
    let material = new THREE.MeshPhongMaterial({
      color: "#42f54e",
      opacity: 0.1
    });
    material.name=identifier
    let mesh = new THREE.Mesh(geometry, material);
    mesh.name= identifier

    return mesh;
}

export const createOrbitGeoModel = (satRec, name="default", scaleFactor) => {
    const identifier = name

    let timeSinceEpoch = 0
    let plotpoints     = 90;
    
    let periodMinutes  = 2*Math.PI/satRec.no; //no rev/min
    let deltaT         = periodMinutes/plotpoints

    let material  = new THREE.LineBasicMaterial({color: 0x075D99,opacity:0.5})
    material.name=identifier

    let geometry = new THREE.Geometry();
    geometry.name=identifier

    for (let i = 0; i <= plotpoints; i++){
      let pAv=sgp4(satRec,timeSinceEpoch + i*deltaT);
      let position = new THREE.Vector3( -pAv.position.y*scaleFactor, //map to three.js coord system
                                        pAv.position.z*scaleFactor, //map to three.js coord system
                                        -pAv.position.x*scaleFactor) //map to three.js coord system
      position.name=identifier
      geometry.vertices.push(position);
    };
  
    let mesh = new THREE.Line(geometry,material)
    mesh.name=identifier
  
  return mesh
}

export const Sun = () => {
  const identifier ="sun"
  const sun = new THREE.DirectionalLight(0xffffff, 1, 4000);
  sun.name=identifier;
  sun.position.set(-100, 400, 400);           //set intial sun position (arbitrary)
  return sun;
}

export const EarthGeoModel = (earthRadius = 6371, scaleFactor = 1/1000)=> {

    const identifier ="earth"

    const radius = earthRadius*scaleFactor
    let geometry = new THREE.SphereGeometry(radius, 32, 32);
    geometry.name = identifier
    let loader = new THREE.TextureLoader()
    loader.name = identifier

    let earthMap = loader.load('http://a-look-beyond.s3-website.eu-west-2.amazonaws.com/assets/images/surface.jpg')
    console.log(earthMap)
    let bumpMap = loader.load("http://a-look-beyond.s3-website.eu-west-2.amazonaws.com/assets/images/bump.jpeg")
    let material = new THREE.MeshPhongMaterial({
        map: earthMap,
        bump: bumpMap,
        bumpScale: 0.05,
        opacity: 1.0
      });
    material.name = identifier

    let sphere = new THREE.Mesh(geometry, material)
    sphere.name =identifier

    return sphere;
}

export const AmbientLight = () =>{
  const  identifier ="ambient light"
  let ambientLight = new THREE.AmbientLight(0xcccccc, 0.6);
  ambientLight.name = identifier
  return ambientLight
}
