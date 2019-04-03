# Moviedex search

API endpoint is http://localhost:8000/movie

Requires Authorization header with Bearer api token.

Takes one or more query parameters 'genre', 'country', 'avg_vote'
Genre and country are search strings; avg_vote is a numerical minimum for the returned movies.

At least one parameter must be specified. Using more than one will return movies satisfying all parameters.

