<script setup>
  import { ref, watch, computed } from "vue"
  import { storeToRefs } from "pinia"
  //导入组件 
  import HomeNavBar from "./cpns/home-nav-bar.vue"
  import HomeSearch from "./cpns/home-search.vue"
  import HomeCategories from "./cpns/home-categories.vue"
  import HomeContent from "./cpns/home-content.vue"

  // 导入useHomeStore
  import useHomeStore from "@/stores/modules/home"

  import useScroll from "@/hooks/useScroll"
  
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
 
  // 封装到一个hook,调用hook
  const { isReachBottom, scrollTop } = useScroll()
  watch(isReachBottom, ( newValue ) => {
    if( newValue ) {
      homeStore.fetchHouseListData().then(() => {
        console.log("aa");
        isReachBottom.value = false
      })
    }
  })

  // 搜索框显示的控制的两种实现
  // 实现1：使用watch
    // const isShowSearchBar = ref(false)
    // watch(scrollTop, ( newValue ) => {
    //   isShowSearchBar.value = newValue >= 100
    // })
  // 实现2：使用计算属性
    const isShowSearchBar = computed(() => {
      return scrollTop.value >= 100
    })


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
    <div v-if="isShowSearchBar">hhhhhh</div>
    <home-categories :categories="categories" />
    <home-content :house-list="houseList"/>
  </div>
</template>

<style lang="less" scoped>
.home {
  padding-bottom: 49px;
}
.banner { 
  img {
    width: 100%;
  }
}

</style>
