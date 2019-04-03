'use strict';
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const movies = require('./movies.json');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

function checkToken (req, res, next) {
  const token = req.get('Authorization');
  if (!token || token.split(' ')[1] !== process.env.API_TOKEN) {
    res.status(401).json({error: 'unauthorized request'});
  } else {
    next();
  }
}

app.use(checkToken);

function strSearchMovies(movies, type, str) {
  return movies.filter(movie => movie[type].toLowerCase().includes(str.toLowerCase()));
}

function voteSearch(movies, vote) {
  return movies.filter(movie => parseFloat(movie['avg_vote']) >= vote);
}

app.get('/movie', (req, res) => {
  let movieSelection = movies;
  const { genre, country, avg_vote } = req.query;

  if (avg_vote) {
    const vote = parseFloat(avg_vote);
    movieSelection = voteSearch(movieSelection, vote);
  }

  if (genre) {
    movieSelection = strSearchMovies(movieSelection, 'genre', genre);
  }

  if (country) {
    movieSelection = strSearchMovies(movieSelection, 'country', country);
  }

  if (!avg_vote && !genre && !country) {
    res.status(400).json({error: 'invalid or missing search'});
  } else {
    res.status(200).json(movieSelection);
  }
});

app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('server started on PORT 8000');
});
