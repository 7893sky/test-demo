快捷键
div{$}*30

在抽离功能组件时，直接操作dom会报错，需要加上eslint注释
/* eslint-disable no-param-reassign */


<goods-card
        v-for="item in goodsList"
        :key="item.id"
        ></goods-card>
        把item 所有属性都给子元素 用v-bind绑定