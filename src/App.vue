<script setup>
  import { computed, ref } from "vue" 
  import { useRoute } from "vue-router"
  import tabBar from '@/components/tabbar/tab-bar01.vue';
  import loading from '@/components/loading/loading.vue';
  import useMainStore from "@/stores/modules/main"
 
  const mainStore  = useMainStore()
  
  const route = useRoute()

  const hideTabBar = computed(() => route.meta.hideTabBar)

</script>

<template>
  <div>
    
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>

    <tab-bar v-if="!hideTabBar"/>
    
    <loading v-if="mainStore.isLoadingShow"/>
  </div>
</template>

<style scoped>

</style>
