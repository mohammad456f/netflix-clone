const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?language=en-US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/movie?with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?language=en-US&with_genres=99`,
};

export default requests;
