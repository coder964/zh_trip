<script setup>
  import tabBar from './components/tabbar/tab-bar.vue';
  
</script>

<template>
  <div>
    <router-view></router-view>
    <!-- <router-link to="/home">首页</router-link>
    <router-link to="/favor">收藏</router-link>
    <router-link to="/order">订单</router-link>
    <router-link to="/message">消息</router-link> -->
    <tab-bar></tab-bar>
  </div>
</template>

<style scoped>

</style>
