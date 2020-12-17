const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const path = require('path');
const yelpAPI = require('./yelpAPI');
const request = require('request');


app.use(express.json())
app.use('/', express.static(path.join(__dirname, '../client/dist')))
app.use('/bundle', express.static(path.join(__dirname, '../client/dist/bundle.js')))

var headers = {
  'Authorization': `Bearer ${yelpAPI.APIkey}`,
  'Content-Type': 'application/graphql'
};

var dataString = function (lat, long) {
  return `{ search( term:"food", latitude: ${lat}, longitude: ${long}, open_now: true, limit: 10 ) { business { name rating review_count photos id categories { title } price  coordinates {
    latitude
    longitude
  }} }}`;
}

var options = {
  url: 'https://api.yelp.com/v3/graphql',
  method: 'POST',
  headers: headers,
  body: ''
};


app.get('/yelp', (req, res) => {
  var opt = options;
  opt.body = dataString(req.query.lat, req.query.long)
  request(opt, (error, response, body) => {
    if (error) {
      console.log(error)
      res.sendStatus(500)
    }
    console.log(body)
    res.send(body)
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
