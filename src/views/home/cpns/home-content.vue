<script setup>
import HomeContentItem from "./home_content_item.vue"
const props = defineProps({
  houseList: {
    type: Array,
    default: () => ({})
  }
})


</script>

<template>
  <div class="home_content">
    <div class="home_title">
      <h2>
        热门精选
      </h2>
    </div>
    <div class="home_list" >
      <template v-for="(item, index) in houseList" :key="index">
        <home-content-item :house-item="item.data"/>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home_content {
  padding: 10px 8px;
  .home_title {
    padding: 10px;
    h2{
      font-size: 22px;
      color: #000;
    }
  }
  .home_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 6px;
}
}

</style>
