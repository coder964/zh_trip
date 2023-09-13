<script>
  export default { name: "home" }
</script>
<script setup>
  import { ref, watch, computed, onActivated } from "vue"
  import { storeToRefs } from "pinia"
  //导入组件 
  import HomeNavBar from "./cpns/home-nav-bar.vue"
  import HomeSearch from "./cpns/home-search.vue"
  import HomeCategories from "./cpns/home-categories.vue"
  import HomeContent from "./cpns/home-content.vue"
  import SearchBar from "@/components/search-bar/search-bar.vue"

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
 
  const homeRef = ref()
  // 封装到一个hook,调用hook
  const { isReachBottom, scrollTop } = useScroll(homeRef)
  watch(isReachBottom, ( newValue ) => {
    // console.log(newValue);
    if( newValue ) {
      // 调用action发起网络请求
      homeStore.fetchHouseListData().then(() => {
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
      return scrollTop.value >= 360
    })

  onActivated(() => {
    // console.log(scrollTop.value);
    homeRef.value.scrollTo({
      top: scrollTop.value
    })
  })
</script>

<template>
  <div class="home" ref="homeRef">
    <!-- 头部 -->
    <home-nav-bar/>
    <!-- banner -->
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <!-- 搜索 -->
    <home-search :hot-suggests="hotSuggests" />
    <home-categories :categories="categories" />
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar :start-date="'09.19'" :end-date="'09.20'"/>
    </div>
    <home-content :house-list="houseList"/>
  </div>
</template>

<style lang="less" scoped>
.home {
  padding-bottom: 49px;
  height: 100vh;
  overflow-y: auto;
}
.banner { 
  img {
    width: 100%;
  }
}
.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
  transition: height 1s;
}
</style>
