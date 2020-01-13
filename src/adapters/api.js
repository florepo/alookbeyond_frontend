

export const BACKEND_URL = "http://localhost:3000"

export const get = (url) => {
    fetch(url)
        .then(resp => resp.json())
}

export const getConstellations =()=>{
    const url = BACKEND_URL +'/constellations'
    return fetch(url)
        .then(response  => response.json())
       
}

export const getSatellites = () => {
    const url = BACKEND_URL +'/satellites'
    return fetch(url)
        .then(response  => response.json())
}



export default {BACKEND_URL, get}
