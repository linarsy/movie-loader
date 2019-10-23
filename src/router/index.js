import Vue from 'vue';
import Router from 'vue-router';

import MoviesCatalog from '@/components/MoviesCatalog';
import MoviesList from '@/components/MoviesList';
import MovieDetails from '@/components/MovieDetails';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MoviesCatalog,
      children: [{
        path: '',
        component: MoviesList,
        alias: '/catalog/0',
      }, {
        path: 'catalog/:genreId',
        name: 'catalog',
        component: MoviesList,
        props: ({ params: { genreId } }) => ({ genreId: +genreId }),
      }, {
        path: 'movie/:id',
        name: 'movie',
        component: MovieDetails,
        props: ({ params: { id } }) => ({ id: +id }),
      }],
    },
  ],
});
