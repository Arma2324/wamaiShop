<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Navigator v-show="$route.meta.navShow"></Navigator>
  </div>
</template>

<script>
import Navigator from "./components/Navigator.vue";

export default {
  components: {
    Navigator,
  },
};
</script>

<style lang="stylus"></style>
