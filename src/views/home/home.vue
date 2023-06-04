<script setup>
  import HomeNavBar from "./cpns/home-nav-bar.vue"
  import HomeSearch from "./cpns/home-search.vue"
</script>

<template>
  <div class="home">
    <home-nav-bar/>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
  </div>
  <home-search/>
</template>

<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
}

</style>
