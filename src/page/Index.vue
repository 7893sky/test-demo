<template>
  <div>
    <router-view></router-view>
    <tab-Bar></tab-Bar>
  </div>
</template>

<script>
import tabBar from '../components/TabBar.vue';

export default {
  components: {
    tabBar,
  },
};
</script>

<style>

</style>
