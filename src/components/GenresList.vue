<template>
  <ul class="nav flex-column">
    <li class="nav-item"  v-for="genre in genres" :key="genre.id">
      <router-link :to="{ name: 'catalog', params: { genreId: genre.id }}">
        <span class="nav-link">{{ genre.name }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'GenresList',
  props: {
    genres: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.router-link-active span {
  text-decoration: underline;
}
</style>
