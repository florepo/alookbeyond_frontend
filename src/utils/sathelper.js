import { sgp4, twoline2satrec, propagate, gstime } from "satellite.js";

  // sat.name, sat.TLE1, sat.TLE1, geoModel,scaleFactor
  export const intializeSatObject = (name, tle1, tle2, threeJSobject, TimeSinceEpoch = 0, scaleFactor=1/4000) => {

    let satrec = twoline2satrec(tle1, tle2);
    let positionAndVelocity = sgp4(satrec, TimeSinceEpoch);

    threeJSobject.userData.name = name;
    threeJSobject.userData.satrec = satrec;

    threeJSobject.position.set(
      positionAndVelocity.position.x * scaleFactor, //map ECI to ThreeJS coord system > x(js) = z(ECI), y(js) = x(ECI), z(js)=y(ECI)
      positionAndVelocity.position.y * scaleFactor,
      positionAndVelocity.position.z * scaleFactor
    );

    return threeJSobject;
  }

