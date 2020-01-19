// export const FRONTEND_URL = "http://a-look-beyond.s3-website.eu-west-2.amazonaws.com"
export const FRONTEND_URL = 'http://localhost:3001'
// export const BACKEND_URL = "https://vast-headland-62704.herokuapp.com"
export const BACKEND_URL = 'http://localhost:3000'

export const WIKIPEDIA_API = 'https://en.wikipedia.org/api/rest_v1/page/summary/'


export const get = (url) => {
    fetch(url)
        .then(resp => resp.json())
}

export const getWikiSummary = () => {
    const url = WIKIPEDIA_API +'/constellations'
    return fetch(url)
        .then(response  => response.json())

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
        // .then(console.log)
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

export const getWatchlists = () => {
    const url = BACKEND_URL +'/watchlists'
    console.log(url)
    return fetch(url)
        .then(response  => response.json())
}


export default {BACKEND_URL, FRONTEND_URL, get}
