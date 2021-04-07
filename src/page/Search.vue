<template>
  <div class="search-wrapper">
    <div class="search-head">
      <van-icon name="arrow-left" class="arr-left" @click="$router.goBack()"/>
      <van-search
        class="search-content"
        v-model="value"
        show-action
        :placeholder="place"
        @search="onSearch"
        @input="input"
        @focus="focus"
      >
      <template #action v-if="showList">
        <div @click="onSearch(value)">搜索</div>
      </template>
      <template #action v-else>
        <van-icon
        name="cart-o"
        id="shop-car"
        class="shop-car"
        :badge="badge"
        @click="$router.push('./index/shopping')"
        />
      </template>
      </van-search>
    </div>
    <div class="like-search" v-if="likeList.length && showList">
      <van-list>
        <van-cell
        v-for="item in likeList" :key="item" @click="onSearch(item)"
        >
        <template>
          <sapn class="custom-title" v-html="formatHTML(item)"></sapn>
        </template>
        </van-cell>
      </van-list>
    </div>
    <div class="goods-list" v-if="!showList">
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
        <goods-card
        v-for="item in goodsList"
        :key="item.id"
        v-bind="item"
        :num="countMap[item.id]"
        ></goods-card>

        </van-list>
    </div>
    <div class="my-history" v-if="likeList.length <= 0 && showList">
      <my-history :searchList="searchList" @search="onSearch"></my-history>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import goodsCard from '../components/GoodsCard.vue';
import myHistory from '../components/MyHistory.vue';

export default {
  components: {
    goodsCard,
    myHistory,
  },
  data() {
    return {
      place: '酒',
      value: this.place,
      likeList: [],
      timer: null,
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      goodsList: [],
      showList: true,
      total: 0,
      searchList: [],
    };
  },
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
  methods: {
    async onLoad() {
      const value = await this.$api.search(this.value, this.page, this.size);
      this.goodsList = [...this.goodsList, ...value.list];
      this.total = value.total;
      this.loading = false;
      // 储存total以便于是否完成
      if (this.goodsList.length >= this.total) {
        this.finished = true;
      } else {
        this.page += 1;
      }
    },
    async onSearch(value) {
      if (value === '') {
        this.value = value;
      } else {
        this.value = this.place;
      }
      const result = this.searchList.find((item) => item.value === this.value);
      if (result) {
        result.time = new Date().getTime();
        this.searchList.sort((a, b) => b.time - a.time);
      } else {
        this.searchList.unshift({ value: this.value, time: new Date().getTime() });
        if (this.searchList.length >= 20) {
          this.searchList.pop();
        }
      }
      // this.searchList.unshift({ value: this.value, time: new Date().getTime() });
      localStorage.setItem('searchList', JSON.stringify(this.searchList));
      this.likeList = [];
      this.page = 1;
      this.finished = false;
      this.onLoad();
      this.showList = false;
    },

    // 防抖
    async input() {
      if (this.vale === '') {
        this.likeList = [];
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => {
          const value = await this.$api.likeSearch(this.value); // 返回的结果需要贮存在likeList
          this.likeList = value.result;
          clearTimeout(this.timer);
          this.timer = null;
        }, 300);
      }
    }, // 需要在api里面发送请求
    focus() {
      this.showList = true;
    },
    formatHTML(item) {
      const reg = new RegExp(this.value, 'g');
      return item.replace(reg, this.value.fontcolor('red'));
    },
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem('searchList')) || [];
  },
};
</script>

<style lang="less" scoped>
.search-wrapper {
  width: 100%;
  height: 100vh;
  z-index: 0;
  background: #fff;
  .search-head {
    width: 345px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 15px;
    z-index: 22;
    .arr.left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
      .shop-car{
        font-size: 15px;
      }
    }
  }
  .like-search{
    position: relative;
    top: 50px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
  }
  .goods-list {
    position: relative;
    width: 345px;
    margin: 48px auto 0;
    z-index: 10;
    background:#fff;
  }
  .my-history{
    width: 350px;
    position: absolute;
    top:35px;
    left: 10px;
    z-index: 1;
  }
}
</style>
