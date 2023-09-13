<script setup>
import { ref, watch } from "vue"
import { storeToRefs } from "pinia";
// 引入useCityStore
import useCityStore from "@/stores/modules/city";
// 调用action，发送网络请求
const cityStore = useCityStore();
// 从Store中解构获取数据
const { listEls, currentIndex} = storeToRefs(cityStore);

// 子传父，绑定函数，发出事件
const emits = defineEmits(["listItmeClick"])

const itemClick = (index) => {
  currentIndex.value = index
  // 发射自定义事件
  emits("listItmeClick", index)
  
}
</script>

<template>
  <div class="list-control">
    <div class="list">
      <span 
        class="item" 
        v-for="(value, key, index) in listEls"
        :key="key"
        @click="itemClick(index)"
        :class="{active: currentIndex === index}"
       > 
        {{ key }} 
      </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.list-control {
  position: fixed;
  z-index: 9;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  .list {
    display: flex;
    flex-direction: column; 
    .item {
      font-size: 12px;
      text-align: center;
    }
    .active {
      border-radius: 50%;
      background-color: #008c8c;
    }
  }
}
</style>
