
import * as THREE from "three";
import { sgp4, twoline2satrec, propagate, gstime } from "satellite.js";

export const createSatelliteGeoModel = (name="unknown", satScaleFactor=1, scaleFactor=1, )=> {

    const size = satScaleFactor*scaleFactor
    console.log(size)
    const identifier = name
    let geometry = new THREE.BoxGeometry(size, size, size);
    geometry.name=identifier
    let material = new THREE.MeshBasicMaterial({ color: "#42f54e"});
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
      geometry.vertices.push(new THREE.Vector3(pAv.position.x*scaleFactor,
                                               pAv.position.y*scaleFactor,
                                               pAv.position.z*scaleFactor));
    };
  
    let mesh = new THREE.Line(geometry,material)
    mesh.name=identifier
  
  return mesh
}


export const EarthGeoModel = (earthRadius = 6371, scaleFactor = 1/1000)=> {

    const identifier ="earth"
    const radius = earthRadius*scaleFactor
    console.log(radius)
    let geometry = new THREE.SphereGeometry(radius, 32, 32);
    geometry.name = identifier
    let loader = new THREE.TextureLoader()
    loader.name = identifier
    // let earthMap = loader.load("surface.jpg")
    let earthMap = loader.load("https://stemkoski.github.io/AR-Examples/images/earth-sphere.jpg")
    let material = new THREE.MeshPhongMaterial({
        map: earthMap,
        opacity: 0.5
      });
    material.name = identifier

    let sphere = new THREE.Mesh(geometry, material)
    sphere.name =identifier

    return sphere;
}

export const AmbientLight = () =>{
  const  identifier ="ambient light"
  let ambientLight = new THREE.AmbientLight(0xcccccc, 0.8);
  ambientLight.name = identifier
  return ambientLight
}
