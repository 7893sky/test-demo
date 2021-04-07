<template>
  <div class="sidebar-wrapper" ref="side">
    <div
    v-for="(item, i) in sideList"
    :key="item"
    :class="{active: index === i}"
    @touchend="scrollTo(i, $event)"
    @touchstart="move = false"
    @touchmove="move = true"
    >{{i == 0 ?'全部': item}}</div>

  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import tools from '../util/tool';

export default {
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    ...mapState({
      sideList: (state) => state.sideList,
    }),
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      const { side } = this.$refs;
      const sonTop = e.target.getBoundingClientRect().top;
      const sonHeight = e.target.offsetHeight;
      const pTop = side.getBoundingClientRect().top;
      const pHeight = side.offsetHeight;
      tools.moveTo(side.scrollTop, sonTop + sonHeight / 2 - pTop - pHeight / 2, side, 'scrollTop');
      // 获取列表页
      this.resetGoodsList(); // 当挂载的时候避免数据冲突，也需要在生命周期里初始化一下
      this.getGoodsList({ type: this.sideList[i], page: 1, sortType: 'all' });
      // 拿到数据之后需要触发，getGoodsList是点击的时候才会触发，页面挂载完成之后触发一下拿到的商品数据
    },
  },
  mounted() {
    // this.resetGoodsList();
    // this.getGoodsList({ type: this.sideList[0], page: 1, sortType: 'all' });
  },
};
</script>

<style lang="less" scoped>
.sidebar-wrapper{
  position: fixed;
  left: 0px;
  width: 79px;
  top: 135px;
  bottom: 50px;
  overflow: auto;
  background: #f8f8f8;
  div {
    width: 79px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .active{
    font-weight: bold;
    color: #ff1a90;
  }
  .active::before{
    position: absolute;
    width: 6px;
    height: 18px;
    background-color: #ff1a90;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    content: '';
  }
}
.sidebar-wrapper::-webkit-scrollbar {
  width: 0px;
  background: none;
}
</style>
