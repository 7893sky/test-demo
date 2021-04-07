<template>
  <div class="one-tab-wrapper" ref="oneTab">
    <div
      class="tab-item"
      v-for="(item, i) in menuList"
      :key="item - title"
      :class="{ active: index == i }"
      @touchend="scrollTo(i,$event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      <div class="img-wrapper">
        <img :src="item.imgURL" />
      </div>
      <div class="tab-title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import tools from '../util/tool';

export default {
  data() {
    return {
      move: false,
      index: 0,
      menuList: [
        {
          title: '时令水果',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E6%97%B6%E4%BB%A4%E6%B0%B4%E6%9E%9C.jpg',
        },
        {
          title: '酒水饮料',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E9%85%92%E6%B0%B4%E5%86%B2%E8%B0%83.jpg',
        },
        {
          title: '安心乳品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E5%AE%89%E5%BF%83%E4%B9%B3%E5%93%81.jpg',
        },
        {
          title: '休闲零食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E4%BC%91%E9%97%B2%E9%9B%B6%E9%A3%9F.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E8%82%89%E8%9B%8B%E9%A3%9F%E6%9D%90.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E6%96%B0%E9%B2%9C%E9%A3%9F%E6%9D%90.jpg',
        },
        {
          title: '熟食美食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E6%97%B6%E4%BB%A4%E6%B0%B4%E6%9E%9C.jpg',
        },
        {
          title: '海鲜水产',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E6%B5%B7%E9%B2%9C%E6%B0%B4%E4%BA%A7.jpg',
        },
        {
          title: '粮油调味',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E6%97%B6%E4%BB%A4%E6%B0%B4%E6%9E%9C.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E7%BA%B8%E5%93%81%E6%B8%85%E6%B4%81.jpg',
        },
        {
          title: '个人护理',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E4%B8%AA%E4%BA%BA%E6%8A%A4%E7%90%86.jpg',
        },
        {
          title: '美妆护肤',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E7%BE%8E%E5%A6%86%E6%8A%A4%E8%82%A4.jpg',
        },
        {
          title: '家居收纳',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E5%AE%B6%E5%B1%85%E6%94%B6%E7%BA%B3.jpg',
        },
        {
          title: '家用电器',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E5%AE%B6%E7%94%A8%E7%94%B5%E5%99%A8.jpg',
        },
        {
          title: '3C数码',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C%E6%95%B0%E7%A0%81.jpg',
        },
        {
          title: '母婴用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E6%AF%8D%E5%A9%B4%E7%94%A8%E5%93%81.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E9%B2%9C%E8%8A%B1%E7%BB%BF%E6%A4%8D.jpg',
        },
        {
          title: '手表配饰',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E6%89%8B%E8%A1%A8%E9%85%8D%E9%A5%B0.jpg',
        },
        {
          title: '宠物用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E5%AE%A0%E7%89%A9%E7%94%A8%E5%93%81.jpg',
        },
        {
          title: '图书玩具',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/%E5%9B%BE%E4%B9%A6%E6%96%87%E5%85%B7.jpg',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['getSideList']),
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      // 计算移动距离
      const { oneTab } = this.$refs;
      const itemWidth = e.target.offsetWidth;
      const itemLeft = e.target.getBoundingClientRect().left;
      const wrapperWidth = oneTab.offsetWidth;
      tools.moveTo(oneTab.scrollLeft, itemWidth / 2 + itemLeft - wrapperWidth / 2, oneTab, 'scrollLeft');
      // 获取侧边栏数据
      this.getSideList(this.menuList[i].title);
    },
    // 封装动画函数(单独抽离)
  },
  // 需要用到生命周期的挂载阶段
  mounted() {
    this.getSideList(this.menuList[0].title);
  },
};
</script>

<style lang="less" scoped>
.one-tab-wrapper {
  width: 375px;
  height: 104px;
  display: flex;
  overflow: auto;
  .tab-item {
    width: 50px;
    height: 70px;
    padding: 10px 5px;
  }
  .img-wrapper {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-content: center;
    border-width: 2px;
    border-style: solid;
    border-color: #fff;
    border-radius: 23px;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      align-self: center;
    }
  }
  .tab-title {
    text-align: center;
    font-size: 12px;
    margin-top: 5px;
  }
  .active {
    .img-wrapper {
      border-color: #d13193;
      .tab-title {
        color: #fff;
        border-color: #d13193;
        font-weight: bold;
        border-radius: 30px;
      }
    }
  }
}
.one-tab-wrapper::-webkit-scrollbar {
  width: 0px;
  background: none;
}
</style>
