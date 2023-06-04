<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"

// 引入useCityStore
import useCityStore from "@/stores/modules/city"

const router = useRouter()

// 监听取消按钮的点击
const cancelClick = () => {
  router.back()
}
// 控制文本框提示内容是否显示
const isShow = ref(true)

// 文本框状态
const inputValue = ref()

// input事件
const searchInput = (e) => {
  const value = e.target.value
  console.log(value);
  if (value) {
    isShow.value = false
    return
  }
  isShow.value = true
}
// 清除文本框内容 
const clearClick = () => {
  inputValue.value = ""
  isShow.value = true
}

const activeIndex = ref(0)
const tabsItemClick = (index) => {
  activeIndex.value = index
}

// 调用action，发送网络请求
const cityStore = useCityStore()
cityStore.fetchAllCityData().then(res => {
  console.log("网络请求成功", );
})
// 使用state，并且数据是响应式的
const { allCity } = storeToRefs(cityStore) 

</script>

<template>
  <div class="city">
    <div class="top">
      <div class="search">
        <label for="input">
          <i class="iconfont icon-sousuo"></i>
          <span v-show="isShow">城市/区域/位置</span>
          <i class="iconfont icon-qingchu" v-show="inputValue" @click="clearClick"></i>
          <input id="input" type="text" v-model="inputValue" @input="searchInput" />
        </label>
      </div>
      <div class="cancel" @click="cancelClick">
        <span>取消</span>
      </div>
    </div>
    <div class="tab_control">
      <template v-for="(value, key, index) in allCity" :key="key">
        <div 
          class="tabs_item" 
          @click="tabsItemClick(index)"
          >{{value.title}}</div>
      </template>
      <div class="tabs_line" :class="{active: activeIndex === 1}"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.top {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 12px;
  .search {
    label {
      position: relative;

      .icon-sousuo {
        position: absolute;
        top: 1px;
        left: 13px;
        font-size: 14px;
        color: var(--primary-color);
      }

      .icon-qingchu {
        position: absolute;
        top: 1px;
        right: 13px;
        font-size: 16px;
        color: #c8c9cc;
      }

      span {
        position: absolute;
        top: 1px;
        left: 35px;
        font-size: 15px;
        color: #c8c9cc;
      }

      input {
        width: 315px;
        height: 34px;
        border-radius: 20px;
        padding: 0;
        background-color: #f7f8fa;
        text-indent: 11%;
        border: none;
        outline: none;
      }
    }
  }

  .cancel {
    margin-left: 1px;
    font-size: 14px;
  }
}
/* .tab_control样式 */
.tab_control {
  display: flex;
  height: 44px;
  line-height: 44px;
  position: relative;
}
.tab_control >.tabs_item {
  flex: 1;
  color: #646566;
  text-align: center;
  font-size: 14px;
} 
.tab_control .tabs_line {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 40px;
  height: 3px;
  background-color: rgb(255, 152, 84);
  transform: translateX(94px) translateX(-50%);
  transition: all 0.5s;
  border-radius: 3px;
}
// 2 4 94
// 3 6  62
.tab_control .active {
  // 94 282
  transform: translateX(280px) translateX(-50%);
}
</style>
