<template>
  <div id="app">
    <transition :name="tarnsitionName" :mode="this.$router.back ? 'out-in': 'in-out'">
      <!-- 组件存在先进后出还是先出后进，是从搜索也返回来，还是从当前页切进去 需要在路由中单独封装方法 -->
      <router-view class="view"></router-view>
    </transition>
     <!-- 处理历史记录时，在路由切换时需要加动画的定义 -->
  </div>
</template>
<script>
export default {
  created() {
    const countMap = JSON.parse(localStorage.getItem('goods')) || {};
    this.$store.commit('setCountMap', countMap);
  },
  data() {
    return {
      transitionName: 'left',
    };
  },
  watch: { // 监听路由的变化
    $route(to, from) {
      if (to.name === 'classify' && from.name === 'search') {
        this.$router.back = true;
      }
      if (this.$router.back) {
        this.transitionName = 'right';
      } else {
        this.transitionName = 'left';
      }
      this.$router.back = false;
    },
  },
};
</script>

<style lang="less">
   .view{
     position: absolute;
     left: 0;
     top: 0;
     width: 100%;
     transition: transform .3 linear;
   }
   .left-enter{
     transform: translate(100%, 0);
   }
</style>
