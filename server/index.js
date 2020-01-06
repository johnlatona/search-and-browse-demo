const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 1337;
const products = require('../static/mockResults.json');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join( __dirname, '../public')));

app.get('/products/:category/:query', (req, res, next) => {
  const { category, query} = req.params;
  let response = JSON.parse(JSON.stringify(products));
  if (category) {
    if (category === 'all') {
      const itemResponse = [];
      for (let category in response.categories) {
        for (let i = 0; i < response.categories[category].length; i++) {
          itemResponse.push(response.categories[category][i]);
        }
      }
      response = itemResponse;
    } else {
      const categoryString = category.split('+').join(' ');
      response = response.categories[categoryString];
    }
  }
  if (query) {
    let found = false;
    const queryArr = query.split('+');
    for (let i = 0; i < response.length; i++) {
      for (let j = 0; j < queryArr.length; j++) {
        if (response[i].itemName.includes(queryArr[j])) {
          response = [response[i]];
          found = true;
        }
      }
    }
    if (!found) {
      response = [
        {
          itemName: "ITEM NOT FOUND"
        }
      ]
    }
  }
  res.status(200).json(response);
});

app.get('/products/:category', (req, res, next) => {
  const { category } = req.params;
  let response = JSON.parse(JSON.stringify(products));
  if (category) {
    const categoryString = category.split('+').join(' ');
    if (categoryString === 'all') {
      const itemResponse = [];
      for (let category in response.categories) {
        for (let i = 0; i < response.categories[category].length; i++) {
          itemResponse.push(response.categories[category][i]);
        }
      }
      response = itemResponse;
    } else {
      response = response.categories[categoryString];
    }
  }
  res.status(200).json(response);
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

server.listen(PORT, () => {
  console.log(`Server Listening on PORT: ${PORT}`);
});
