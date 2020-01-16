export const FRONTEND_URL = "http://localhost:3001"

export const BACKEND_URL = "http://localhost:3000"



export const get = (url) => {
    fetch(url)
        .then(resp => resp.json())
}

export const getConstellations = () => {
    const url = BACKEND_URL +'/constellations'
    return fetch(url)
        .then(response  => response.json())
}

export const getConstellationSats = (id) => {
    const url = BACKEND_URL +'/constellations/' + id
    return fetch(url)
        .then(response  => response.json())
}

export const getSatellites = () => {
    const url = BACKEND_URL +'/satellites'
    return fetch(url)
        .then(response  => response.json())
}

export const getWatchlist = (id) => {
    const url = BACKEND_URL +'/watchlists/' + id
    console.log(url)
    return fetch(url)
        .then(response  => response.json())
}



export default {BACKEND_URL, FRONTEND_URL, get}
