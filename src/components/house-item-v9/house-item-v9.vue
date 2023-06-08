<script setup>
import { computed } from "vue"  

const priceFn = (price) => {
  return "￥" + price
} 

const props = defineProps({
  houseItem: {
    type: Object,
    default: () => ({})
  }
})

const value = computed(() => Number(props.houseItem.commentScore))

</script>

<template>
   <div class="house_item">
      <div class="cover">
        <img :src="houseItem.image.url" alt="">
      </div>
      <div class="info">
        <div class="summary_text">{{ houseItem.summaryText }}</div>
        <div class="house_name">
          {{ houseItem.houseName }}
        </div>
        <div class="particulars">
          <van-rate 
            class="rate"
            v-model="value"  
            allow-half 
            readonly
            color="#fff"
            size="16px"
          />
          <span class="finalPrice">{{ priceFn(houseItem.finalPrice) }}</span>
        </div>
      </div>
    </div>
</template>

<style lang="less" scoped>
.house_item {
  position: relative;
  margin-bottom: 10px;
  
  .cover {
    img {
      width: 170px;
      height: 226px;
      border-radius: 6px;
    }
  }

  .info {
    position: absolute;
    bottom: 0;
    padding: 8px 10px;
    color: #fff;

    .summary_text {
      font-size: 12px;
      margin-bottom: 5px;
    }

    .house_name {
      font-size: 14px;
      /* 溢出部分隐藏 */
      overflow: hidden;
      /* 文字用省略号代替超出部分 */
      text-overflow: ellipsis;
      /* 使用弹性伸缩盒模型显示 */
      display: -webkit-box;
      /* 限制在一个块元素显示的文本的行数 */
      -webkit-line-clamp: 2;
      /* 设置或检索伸缩盒对象的子元素的排列方式 */
      -webkit-box-orient: vertical;

    }
    .particulars {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
