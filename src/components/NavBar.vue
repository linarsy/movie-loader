<template>
  <nav class="navbar navbar-dark bg-info sticky-top">
    <div class="container">
      <router-link to="/">
        <span class="navbar-brand font-weight-bold">{{ title }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      title: 'Movie Loader',
    };
  },
};
</script>

<style scoped></style>
