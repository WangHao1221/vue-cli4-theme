<template>
  <keep-alive :include="cacheList">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: 'template',
  computed: {
    cacheList() {
      return this.$store.state.cacheList;
    },
  },
};
</script>
