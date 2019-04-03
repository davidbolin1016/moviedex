'use strict';

const express = require('express');
const movies = require('./movies.json');
const app = express();

app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('server started on PORT 8000');
});
