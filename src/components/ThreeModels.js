
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

    console.log(earthMap)
    let material2 = new THREE.MeshPhongMaterial({
        map: earthMap,
        opacity: 0.5
      });
    
    let sphere = new THREE.Mesh(geometry, material2)

    sphere.name =identifier

    return sphere;
}

export const AmbientLight = () =>{

    const  identifier ="ambient light"

    let ambientLight = new THREE.AmbientLight(0xcccccc, 0.8);
    ambientLight.name = identifier
    
    return ambientLight
}
