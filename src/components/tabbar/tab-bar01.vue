<script setup>
  import { ref } from "vue"
  import { useRouter } from "vue-router"
  // tabbar的动态数据
  import tabbarData from "@/assets/data/tabbar"

  const router = useRouter()
  
  // 解决动态资源图片url解析的问题
  import getAssetURL from "@/utils/get_asset_url"

  // 
  const currentIndex = ref(0)
  // 点击事件的函数
  const tabbarClick = (index, path) => {
    currentIndex.value = index

    // 切换路由
    router.push(path)
  }
</script>

<template>
    <div class="tabbar">
      <template v-for="(item, index) in tabbarData">
      <div 
        class="tabbr-item" 
        :class="{ active: currentIndex == index}"
        @click="tabbarClick(index, item.path)"
        >
        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
        <img v-else :src="getAssetURL(item.imageActive)" alt="">
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped> 
  .tabbar{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;

    .tabbr-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      padding-top: 5px;
      &.active {
        color: var(--primary-color);
      }
      img {
        width: 36px;
      }
      .text {
      font-size: 12px;
      margin-top: 2px;
    }
    }
  }
</style>
