<template>
  <div class="card-group">
    <div class="card col-md-6 col-lg-4 mb-2 p-0" v-for="movie in movies" :key="movie.id">
      <router-link :to="{ name: 'movie', params: { id: movie.id }}">
        <img class="card-img-top" :src="posterHost + movie.poster_path" alt="#">
      </router-link>
      <div class="card-body">
        <p class="card-text text-info text-uppercase font-weight-bold">
          <router-link :to="{ name: 'movie', params: { id: movie.id }}">
            {{ movie.title }}
          </router-link>
        </p>
        <div class="card-text">
          <span class="font-weight-bold">Добавлен: </span> {{ movie.release_date }}
        </div>
        <div class="card-text">
          <span class="font-weight-bold">Оценка: </span> {{ movie.vote_average }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import routes from '../utils/routes';

export default {
  name: 'MoviesList',
  props: {
    genreId: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  data () {
    return {
      posterHost: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2',
      movies: [],
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler: 'getMovies',
    },
  },
  methods: {
    getMovies () {
      const moviesUrl = routes.moviesPath();

      axios.get(moviesUrl)
        .then(({ data: { results } }) => {
          if (!this.genreId) {
            this.movies = results;
          } else {
            /* eslint-disable-next-line camelcase */
            this.movies = results.filter(({genre_ids}) => genre_ids.indexOf(this.genreId) !== -1);
          }
        })
        .catch((e) => {
          throw e;
        });
    },
  },
};
</script>

<style scoped>
.card-group .card {
  flex: none;
}
</style>
