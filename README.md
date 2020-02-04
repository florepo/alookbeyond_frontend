#  A look Beyond
[A Look Beyond](https://cocky-curie-b08b8e.netlify.com/) 

A web based tool for real-time visualization of satellite constellations in 3D.
It integrates and utilizes three.js for the creation and 3D rendering of the constellation.

![Image of A Look Beyond](https://imgur.com/a/MqocQQL)

## Key Features

1. User can browser and select and deselect multiple satellite constellations from different categories for display in 3D
2. Shown positions derived from calculations  (satellite.js) based on open satellite operator data and represent the actual local at the time of viewing.
3. Visualisations can be explored in 3D (zoom in out, rotate)
4. Favourite views can be saved to the data base for later retrival.

![Image of Constellation View](https://imgur.com/iJfoyqS)

## Motivation
- Reveal the hidden beauty of satellite constellations in a visually stunning and intuative way, in order to showcase a technology everyday life largely depends on (via GPS Navigation, Telecommunication, Weather Forecast...) in a non obvious way.
- Exploring how Javascript libraries and 3D rendering can be incorporated in a modern Front-end library like React.
- Build a web application utilizind tools and methods learned in the last 4 month as part of my bootcamp training and extracurricular learning activities.
- Exploring the use of integrated Continous Delivery services from Netlify and Heruko.

## Tech Stack
- Front-end in React
- Ruby on Rails API for the Back-end
- Postgres as Database

## Notes on used 3rd Party Libraries and APIs
- Satellite positions are calculated using satellite.js library based on orbital parameters scraped from Celestrak.
- Three.js was utilized for 3D rendering and orbit visualization

## Live Site Deployment
- Front-end deployment on commit with integrayed Continous Deployment pipeline from Netlify
- Back-end deployment on commit with Heroku's integrated Continous Deployment pipeline


## Comments and Outlook
- Due to deployment backend to Heroku loading of constellations may require a couple of seconds on first load due to cold start of backend server.
- Next release aims to incorporate a Augmented Reality version of the 3D view
- Three.js currently doesn't incorporate a method for garbage collection of no longer used geometries, next release aims to incorporates a Javascript class method to track (and later dispose) created objects

## License
MIT © @flow1981
