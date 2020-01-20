// export const FRONTEND_URL = "http://a-look-beyond.s3-website.eu-west-2.amazonaws.com"
export const FRONTEND_URL = 'http://localhost:3001'
// export const BACKEND_URL = "https://vast-headland-62704.herokuapp.com"
export const BACKEND_URL = 'http://localhost:3000'

const apiHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };

export const get = (url) => {
    fetch(url)
        .then(resp => resp.json())
}

export const patch = (url, data) => {

    let configObject  ={ method: "POST",
                    headers: apiHeaders,
                    body: JSON.stringify({data})}

        return fetch(url, configObject)
            .then(resp => resp.json());
}


export const getConstellations = () => {
    const url = BACKEND_URL +'/constellations'
    return get(url)
}

export const getConstellationSats = (id) => {
    const url = BACKEND_URL +'/constellations/' + id
    return get(url)
}

export const getSatellites = () => {
    const url = BACKEND_URL +'/satellites'
    return get(url)
}

export const getWatchlist = (id) => {
    const url = BACKEND_URL +'/watchlists/' + id
    return get(url)
}

export const getWatchlists = () => {
    const url = BACKEND_URL +'/watchlists'
    console.log(url)
    return get(url)
}

export const patchWatchList = (data, id) => {
    const url = BACKEND_URL +'/watchlists'+ id
    console.log("posting")
    patch(url,data)
}

export default {BACKEND_URL, FRONTEND_URL}
