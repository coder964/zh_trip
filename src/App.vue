<script setup>
  import { useRoute } from "vue-router"
  import tabBar from './components/tabbar/tab-bar01.vue';

  const route = useRoute()
  
</script>

<template>
  <div>
    <router-view></router-view>

    <tab-bar v-if="!route.meta.hideTabBar"/>
  </div>
</template>

<style scoped>

</style>
