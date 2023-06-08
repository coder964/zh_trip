<script setup>
  import { storeToRefs } from "pinia"
  //导入组件 
  import HomeNavBar from "./cpns/home-nav-bar.vue"
  import HomeSearch from "./cpns/home-search.vue"
  import HomeCategories from "./cpns/home-categories.vue"
  import HomeContent from "./cpns/home-content.vue"

  // 导入useHomeStore
  import useHomeStore from "@/stores/modules/home"
  
  // 发送网络请求
  const homeStore = useHomeStore()
    //调用action发起网络请求 
  homeStore.fetchHotSuggestsData()
  homeStore.fetchCategoriesData()
  homeStore.fetchHouseListData()
    // 热门建议/推荐类别的数据
  const { 
    hotSuggests, 
    categories, 
    houseList 
  } = storeToRefs(homeStore)
   
</script>

<template>
  <div class="home">
    <!-- 头部 -->
    <home-nav-bar/>
    <!-- banner -->
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <!-- 搜索 -->
    <home-search :hot-suggests="hotSuggests" />
    <home-categories :categories="categories" />
    <home-content :house-list="houseList"/>
  </div>
</template>

<style lang="less" scoped>
.banner { 
  img {
    width: 100%;
  }
}

</style>
