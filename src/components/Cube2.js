
import * as THREE from "three";

export const Cube = ()=> {
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: "#433F81" });
    let cube = new THREE.Mesh(geometry, material);
    return cube;
}

