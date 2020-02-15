const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const path = require('path');
const yelpAPI = require('./yelpAPI');
// const db = require('./db/connection');
const request = require('request');


app.use(express.json())
app.use('/', express.static(path.join(__dirname, '../client/dist')))
app.use('/bundle', express.static(path.join(__dirname, '../client/dist/bundle.js')))

var headers = {
  'Authorization': `Bearer ${yelpAPI.APIkey}`,
  'Content-Type': 'application/graphql'
};

var dataString = function (lat, long) {
  return `{ search( term:"food", latitude: ${47.611981}, longitude: ${-122.345618}, open_now: true, limit: 5 ) { business { name rating review_count photos id categories { title } price } }}`;
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

app.post('/api/newrestaurant/', (req, res) => {
  const info = req.query;
  db.Create(info)
    .then(success => res.send(success))
    .catch(error => res.send(error))
});

app.get('/api/restaurants/', (req, res) => {
  res.send(['Canlis', `Walrus and Carpenter`, 'El Borracho', 'Japonessa', 'Il Corvo', 'Le Pichet', 'Salumi', 'Macrina', 'Rocco', 'Mediterranean Mix', 'Poke Bar'])
  // db.Read()
  //   .then(restaurants => res.send(restaurants))
  //   .catch(error => res.send(error))
});

// app.put('/api/restaurants/', (req, res) => {
//   const id = req.query.id;
//   const liked = req.query.liked;
//   db.Update(id, liked)
//     .then(success => res.send(success))
//     .catch(error => res.send(error))
// });

// app.delete('/api/restaurants/remove', (req, res) => {
//   const id = req.query.id;
//   db.Delete(id)
//     .then(success => res.send(success))
//     .catch(error => res.send(error))
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
