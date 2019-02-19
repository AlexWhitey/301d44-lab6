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
  console.log('response to front', locationData);
  response.send(locationData);
});

//Errror handler
function handleError(err, res){
  console.error(err);
  if (res) res.status(500).send('Piss Off');
}

// search lat long funciton
function searchToLatLong(query){
  const geoData = require('./data/geo.json');
  const location = new Location(query, geoData);
  console.log('Location in searchToLatLong()', location);
  return location;
}

function Location(query, res) {
  console.log('res in Location()', res);
  this.search_query = query;
  this.formatted_query = res.results[0].formatted_address;
  this.latitude = res.results[0].geometry.location.lat;
  this.longitude = res.results[0].geometry.location.lng;
}

app.listen(PORT, () => console.log(`App is up on ${PORT}`));
