import React, { Component } from 'react'
import * as THREE from "three";

class Viewport extends React.Component {

    componentDidMount() {
      const width = this.mount.clientWidth;
      const height = this.mount.clientHeight;
      window.addEventListener("resize", this.handleWindowResize);
  
      // setup scene
      this.scene = new THREE.Scene();
  
      //setup camera
      this.camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
      this.camera.position.set( 0, 30, 40 );
  
      // setup rendering
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setClearColor('#666666');
      this.renderer.setSize(width, height, false);
      this.mount.appendChild(this.renderer.domElement);
  
      // setup geo
      const geometry = new THREE.BoxGeometry(200, 200, 200);
      const material = new THREE.MeshBasicMaterial({ color: '#433F81' });
      this.cube = new THREE.Mesh(geometry, material);
      this.scene.add(this.cube);
      
      this.renderer.render(this.scene, this.camera);
      
      this.animate();
  
    }
  
    componentWillUnmount() {
      window.removeEventListener("resize", this.handleWindowResize);
      this.mount.removeChild(this.renderer.domElement);
    }
  
    handleWindowResize = () => {
      const width = this.mount.clientWidth;
      const height = this.mount.clientHeight;
  
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
  
      this.renderer.setSize(width, height, false);
      
      this.renderer.render(this.scene, this.camera);
    }
    
    animate = () => {
      requestAnimationFrame(this.animate);
      this.cube.rotation.x += 0.005;
      this.cube.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
    }
    
    render() {
      return (
        <div className="viewport" ref={(mount) => { this.mount = mount }} />
      );
    }
  }
  
  export default Viewport 