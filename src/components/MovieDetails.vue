<template>
  <div>
    <div class="card">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img :src="poster" class="card-img" alt="#">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h2 class="card-title">{{ movieDetails.title }}</h2>
            <p class="card-text">{{ movieDetails.overview }}</p>
            <div class="card-text">
              <b>Название: </b>{{ movieDetails.title }}
            </div>
            <div class="card-text">
              <b>Название зарубежное: </b>{{ movieDetails.original_title }}
            </div>
            <div class="card-text">
              <b>Год выпуска: </b>{{ movieDetails.release_date }}
            </div>
            <div class="card-text list">
              <b>Страна: </b>
              <span v-for="(country, index)  in countries" :key="country.iso_3166_1">
                {{ country.name }}<span v-if="index !== countries.length - 1">,</span>
              </span>
            </div>
            <div class="card-text">
              <b>Бюджет: </b>${{ movieDetails.budget }}
            </div>
            <div class="card-text">
              <b>Продолжительность: </b>{{ movieDetails.runtime }} мин.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5" v-if="videoKey">
      <iframe width="100%" height="400" :src="video" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import routes from '../utils/routes';

const hostPoster = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';
const hostVideo = 'https://www.youtube.com/embed/';

export default {
  name: 'MovieDetails',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      movieDetails: {},
      videoKey: '',
    };
  },
  computed: {
    poster() {
      if (!this.movieDetails.poster_path) return null;
      return `${hostPoster}${this.movieDetails.poster_path}`;
    },
    countries () {
      return this.movieDetails.production_countries;
    },
    video() {
      return `${hostVideo}${this.videoKey}`;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler: 'getMovie',
    },
  },
  methods: {
    getMovie () {
    const detailsUrl = routes.detailsPath(this.id);
    const videoUrl = routes.videoPath(this.id);

    axios.get(detailsUrl)
      .then(({ data }) => {
        this.movieDetails = data;
      })
      .catch((e) => {
        throw e;
      });

    axios.get(videoUrl)
      .then(({ data: { results } }) => {
        if (!results.length) {
          this.videoKey = '';
        } else {
          const { key } = results[0];
          this.videoKey = key;
        }
      })
      .catch((e) => {
        throw e;
      });
    },
  },
};
</script>

<style scoped></style>
