<script setup>
  import houseItemV9 from "@/components/house-item-v9/house-item-v9.vue"
  import houseItemV3 from "@/components/house-item-v3/house-item-v3.vue"
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
        <house-item-v9 v-if="item.discoveryContentType == 9" :house-item="item.data"/>
        <house-item-v3 v-else-if="item.discoveryContentType == 3" :house-item="item.data"/>
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
