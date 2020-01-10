
import {Mesh, SphereGeometry, TextureLoader, MeshLambertMaterial} from 'three'

const createEarth = () => {
  
  let geometry = new SphereGeometry(0.5, 32, 32);

  let loader = new TextureLoader();
  let earthMap = loader.load('../images/surface.jpeg')


  let material = new MeshLambertMaterial({
    // map: earthMap,
    opacity: 0.5
  });

//   let mesh = Mesh(geometry, material);

  return geometry
}

export default createEarth