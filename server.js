'use strict';

require('dotenv').config();

const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
app.use(cors());


//route to location
app.get('/location', (request, response) => {
  const locationData = searchToLatLong(request.query.data);
  response.send(locationData);
});

//route to weather
app.get('/weather', (request, response) => {
  const weatherData = getweather(request.query.data);
  response.send(weatherData);
}

//Errror handler
function handleError(err, res){
  console.error(err);
  if (res) res.status(500).send('Piss Off');
}

//search lat long funciton
function searchToLatLong(query){
  const geoData = require('./data/geo.json');
  const location = new Location(query, geoData);
  console.log('Location in searchToLatLong()', location);
  return location;
}

//search to weatherdata
function getWeather(query){
  const darkSkyData = require('./data/darksky.json');
  let weatherSummaries = [];
  darkSkyData.daily.data.forEach(day=>{
    weatherSummaries.push(new Weather(day));
  });
  return weatherSummaries
}

//location constructor
function Location(query, res) {
  console.log('res in Location()', res);
  this.search_query = query;
  this.formatted_query = res.results[0].formatted_address;
  this.latitude = res.results[0].geometry.location.lat;
  this.longitude = res.results[0].geometry.location.lng;
}

//forecast constructor
function Weather(day){
  this.forecast = day.summary;
  this.time = new Date(day.time*1000).toString().slice(0,15);
}

app.listen(PORT, () => console.log(`App is up on ${PORT}`));
