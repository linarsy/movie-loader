<template>
  <div class="row">
    <div class="col-3">
      <GenresList :genres="filteredGenres" />
    </div>
    <div class="col-9">
      <router-view />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import union from 'lodash/union';
import flatten from 'lodash/flatten';
import routes from '../utils/routes';
import GenresList from './GenresList';

export default {
  components: {
    GenresList,
  },
  name: 'MoviesCatalog',
  data () {
    return {
      genres: [],
      movies: [],
    };
  },
  computed: {
    movieGenresIds () {
      /* eslint-disable-next-line camelcase */
      const genreIds = this.movies.map(({genre_ids}) => genre_ids);
      return union(flatten(genreIds));
    },
    filteredGenres () {
      return this.genres.filter(({id}) => this.movieGenresIds.indexOf(id) !== -1);
    },
  },
  created: function () {
    const genresUrl = routes.genresPath();
    const moviesUrl = routes.moviesPath();

    axios.get(genresUrl)
      .then(({ data: { genres } }) => {
        this.genres = genres;
      })
      .catch((e) => {
        throw e;
      });

    axios.get(moviesUrl)
      .then(({ data: { results } }) => {
        this.movies = results;
      })
      .catch((e) => {
        throw e;
      });
  },
};
</script>

<style scoped></style>
