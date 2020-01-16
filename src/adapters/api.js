export const FRONTEND_URL = "http://a-look-beyond.s3-website.eu-west-2.amazonaws.com/demo"

export const BACKEND_URL = "https://vast-headland-62704.herokuapp.com/"



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
