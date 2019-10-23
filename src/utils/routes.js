const host = 'https://api.themoviedb.org';
const prefix = '/3';
const key = '?api_key=0eaf8d553f30976f3e47ea7a91aeeb7c';
const language = '&language=ru-RU';

export default {
  genresPath: () => [host, prefix, '/genre/movie/list', key, language].join(''),
  moviesPath: () => [host, prefix, '/movie/popular', key, language].join(''),
  detailsPath: id => [host, prefix, '/movie/', id, key, language].join(''),
  videoPath: id => [host, prefix, '/movie/', id, '/videos', key, language].join(''),
};
