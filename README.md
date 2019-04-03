# Moviedex search

API endpoint localhost:8000/movie

Requires Authorization header with Bearer api token.

Takes query parameters :

searchType (string): 'genre', 'country', or 'avg_vote'
vote (number, only if searching by avg_vote)
searchTerm (string, only used if searching by genre or country)


