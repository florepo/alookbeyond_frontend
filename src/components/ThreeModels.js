
import * as THREE from "three";

export const SatelliteGeoModel = (name="unknown", scaleFactor=0.1, color="#466F81")=> {
    let geometry = new THREE.BoxGeometry(scaleFactor, scaleFactor, scaleFactor);
    let material = new THREE.MeshBasicMaterial({ color});
    let cube = new THREE.Mesh(geometry, material);
    cube.name= name
    return cube;
}

export const EarthGeoModel = (scaleFactor=0.5, color = "#433F81")=> {
    let geometry = new THREE.SphereGeometry(scaleFactor, 32, 32);
    let material = new THREE.MeshBasicMaterial({ color});
    let sphere = new THREE.Mesh(geometry, material);
    sphere.name ="earth"
    return sphere;
}
