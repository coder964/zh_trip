<script setup>
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => []
  }
})

// 对数据进行转换
const swipeGroup = {}

for (const item of props.swipeData) {
  let valueArray = swipeGroup[item.enumPictureCategory] 
  if( !valueArray ) {
    valueArray = []
    swipeGroup[item.enumPictureCategory] = valueArray   
  }
  valueArray.push(item)
}

// 对title数据进行格式处理
const titleReg = /【(.*?)】/i
const getTitles = (title) => {
  const result = titleReg.exec(title)
  return result[1]
}

const getCategoryIndex = (item) => {
  const valueArray = swipeGroup[item.enumPictureCategory]
  return valueArray.findIndex(i => i == item) + 1
}


</script>

<template>
  <div class="swiper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData" :key="index">
        <van-swipe-item>
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>
      <!-- 自定义轮播图指示器 -->
      <template #indicator="{ active, total }">
        <div class="indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
            <span
              class="item"
              :class="{active: swipeData[active]?.enumPictureCategory == key }"
            >
              {{ getTitles(value[0].title) }}
            <span v-if="swipeData[active]?.enumPictureCategory == key">
              {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
            </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<style lang="less" scoped>
.swiper {
  .my-swipe {
    img {
      width: 100%;
    }
  }

  .indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    background: rgb(0, 0, 0);

    .item {
      margin: 0 5px;
      &.active {
        padding: 0 4px;
        border-radius: 4px;
        color: #000;
        background: #fff;
      }
    }
  }
}
</style>
