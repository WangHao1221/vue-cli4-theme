<template>
  <div id="app">
    <router-view/>
    <Spin class="app-loading" size="large" fix v-show="spinShow"></Spin>
  </div>
</template>

<script>
import '@/assets/less/global.less'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['loading'])
  },
  data() {
    return {
      spinShow: ''
    }
  },
  watch: {
    loading() {
      if (!this.loading) {
        this.spinShow = false
      } else {
        this.spinShow = true
      }
    }
  }
}
</script>

<style lang="less">
.size{
  height: 100%;
}
html,body{
  .size;

  overflow: hidden; 
  margin: 0; 
  padding: 0;
}
#app {
  .size;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
  .app-loading {
    z-index: 999999;
    background-color: hsla(0,0%,100%,.9);
  }
}
</style>
