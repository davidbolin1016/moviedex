'use strict';


const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const movies = require('./movies.json');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());


function strSearchMovies(type, str) {
  return movies.filter(movie => movie[type].toLowerCase().includes(str.toLowerCase()));
}

function voteSearch(vote) {
  return movies.filter(movie => parseFloat(movie['avg_vote']) >= vote);
}

app.get('/movie', (req, res) => {
  const searchType = req.query.searchType;
  const searchTerm = req.query.searchTerm;
  const searchVote = req.query.vote;

  if (searchType === 'avg_vote') {
    if (!searchVote) {
      res.json(400, {error: 'missing input for average vote'});
    }

    const vote = parseFloat(searchVote);
    res.json(voteSearch(vote));
  }

  if (!searchType || ['genre', 'country'].indexOf(searchType) === -1) {
    res.json(400, {error: 'invalid or missing searchType'});
  }

  if (!searchTerm) {
    res.json(400, {error: 'missing search searchTerm'});
  }



  res.json(strSearchMovies(searchType, searchTerm));
});

app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('server started on PORT 8000');
});
