
import * as THREE from "three";

export const SatelliteGeoModel = (name="unknown", scaleFactor=0.1, color="#466F81")=> {

    const identifier = name
    let geometry = new THREE.BoxGeometry(scaleFactor, scaleFactor, scaleFactor);
    geometry.name=identifier
    let material = new THREE.MeshBasicMaterial({ color});
    material.name=identifier
    let cube = new THREE.Mesh(geometry, material);
    cube.name= identifier

    return cube;
}

export const OrbitGeoModel = (satRec) => {

    let geo = new THREE.Geometry();
    
    let timeSinceEpoch = 0
    let plotpoints     = 90;
    
    let periodMinutes  = 2*Math.PI/satRec.no; //no rev/min
    console.log('orbitalperiod',periodMinutes)
    let deltaT         = periodMinutes/plotpoints
    
    for (let i = 0; i <= plotpoints; i++){

      let pAv=satellite.sgp4(satRec,timeSinceEpoch + i*deltaT);

      geo.vertices.push(new THREE.Vector3(pAv.position.x*scaleFactor,
                                          pAv.position.y*scaleFactor,
                                          pAv.position.z*scaleFactor));
    };
  
    let material  = new THREE.LineBasicMaterial({color: orbitColor,opacity:0.5})
    let orbitMesh = new THREE.Line(geo,material)

  
  return orbitMesh
}


export const EarthGeoModel = (scaleFactor=0.5, color = "#433F81")=> {

    const identifier ="earth"

    let geometry = new THREE.SphereGeometry(scaleFactor, 32, 32);
    geometry.name = identifier
    let material = new THREE.MeshBasicMaterial({ color});
    material.name = identifier
    let loader = new THREE.TextureLoader()
    loader.name = identifier
    // let earthMap = loader.load("surface.jpg")
    let earthMap = loader.load("https://stemkoski.github.io/AR-Examples/images/earth-sphere.jpg")
    let material = new THREE.MeshPhongMaterial({
        map: earthMap,
        opacity: 0.5
      });
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
