<template>
  <van-tabbar fixed route>
    <van-tabbar-item icon="home-o" to="/index/home">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/index/classify">分类</van-tabbar-item>
    <van-tabbar-item icon="cart-o" to="/index/shopping" id="shop-car"
    :badge="badge">购物车</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/index/user">用户中心</van-tabbar-item>
</van-tabbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      countMap: (state) => state.countMap,
    }),
    badge() {
      const counter = Object.values(this.countMap).reduce((prev, next) => prev + next, 0);
      if (counter > 99) {
        return '99+';
      }
      return counter;
    },
  },
};
</script>

<style>

</style>
