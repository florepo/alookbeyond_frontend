import { sgp4, twoline2satrec, propagate, gstime, eciToGeodetic, degreesLat, degreesLong } from "satellite.js";
import {Matrix4} from 'three'

export const intializeSatObject = (name, tle1, tle2, threeJSobject, scaleFactor=1, timeSinceEpoch = 0)=> {
  let satrec = twoline2satrec(tle1, tle2);
  let positionAndVelocity = sgp4(satrec, timeSinceEpoch);
  threeJSobject.userData.name = name;
  threeJSobject.userData.satrec = satrec;
  
  threeJSobject.position.set(
    -positionAndVelocity.position.y * scaleFactor, //map ECI to ThreeJS coord system
    positionAndVelocity.position.z * scaleFactor,
    -positionAndVelocity.position.x * scaleFactor
  );
  return threeJSobject;
}

export const updateSatPostion = (satObject, date, scaleFactor=1) => {
  let pAv = propagate(satObject.userData.satrec,date);
  satObject.position.set(-pAv.position.y*scaleFactor,    // map to three.js coord system  y* >> x
                         pAv.position.z*scaleFactor,    // map to three.js coord system  z* >> y
                         -pAv.position.x*scaleFactor);  // map to three.js coord system -x* >> z
  return satObject;
}



export const alignXaxis2Equinox = (object,date) => {

  var gmst = gstime(date);  //GMST rad is same as GHA of Aries (Vernal Equinox)
  console.log('gmst [deg]',gmst*180/Math.PI)
  console.log('gmst [rad]',gmst)
  object.rotation.y = object.rotation.y + gmst*180/Math.PI //Tilting the earth
  console.log('ory',object.rotation.y)

  return object;

};

const setSatGeoLocation = (satContainer,pAv,date) => {

  let gmst = gstime(date);

  let positionEci  = pAv.position;
  let positionGd   = eciToGeodetic(positionEci, gmst);

  satContainer.userData.latitude  = degreesLat(positionGd.latitude);
  satContainer.userData.longitude = degreesLong(positionGd.longitude);
  satContainer.userData.height    = positionGd.height;

  return satContainer;
}



// export const updatedDate = (currentDate,deltatime,timefactor) => {
//     const addSeconds = deltatime*timefactor;
//     const newDate    = new Date(currentDate.getTime() + (addSeconds * 1000));
//   return newDate
// }

// export const updateEpochTime = (currentDate,deltatime,timefactor) => {
//   const timeDisplay = document.getElementById('epoch-time');   
//   const newDate     = updatedDate(currentDate,deltatime,timefactor)
//   timeDisplay.style.visibility  = 'visible';   
//   timeDisplay.style.fontSize    = '2vw';             
//   timeDisplay.innerHTML         = '<b> Displayed Time: </b>'+ newDate;   

// }
