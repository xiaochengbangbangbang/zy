<template>
  <div id="app">
    <!-- hello everyone -->
    <Header></Header>
    <main-box></main-box>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import MainBox from "./components/MainBox.vue";
export default {
  name: "app",
  components: {
    Header,
    MainBox,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
#app {
  /* 高度不指定，如果指定那么就会有组件超出界限 */
    height: 100vh;
  position: relative;
  /*width: 24rem;*/
    width: 100vw;
  /* height: 13.5rem; */
  line-height: 1.15;
  background: url("../public/images/bg.jpg") no-repeat;
  background-size: 100% 100%;
}
</style>
