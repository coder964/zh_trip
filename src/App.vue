<script setup>
  import { computed } from "vue" 
  import { useRoute } from "vue-router"
  import tabBar from './components/tabbar/tab-bar01.vue';

  const route = useRoute()

  const hideTabBar = computed(() => route.meta.hideTabBar)
</script>

<template>
  <div>
    <router-view></router-view>

    <tab-bar v-if="!hideTabBar"/>
  </div>
</template>

<style scoped>

</style>
