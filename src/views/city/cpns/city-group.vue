<script setup>
import { useRouter } from "vue-router"
import useCityStore from "@/stores/modules/city"

const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

const cityStore = useCityStore()
const router = useRouter()
const cityClick = (item) => {
  // 将本次点击的城市信息保存到pinia中，方便回写
  cityStore.currentCity = item
  // 回退到上一级
  router.back()
}
</script>

<template>
  <div class="city_group">
      <!-- 热门城市 -->
    <div class="hot_cities">
      <div class="title">热门</div>
      <div class="city_all">
        <template v-for="(item, index) in groupData.hotCities" :key="index">
          <div class="city_item" @click="cityClick(item)">
            {{ item.cityName }}
          </div>
        </template> 
      </div>
    </div>
       <!-- 城市清单 -->
    <template v-for="(group, index) in groupData?.cities" :key="index">
      <div class="city_title">{{ group.group }}</div>
      <div class="city">
        <template v-for="(city, indey) in group.cities" :key="indey">
          <div class="city_item" @click="cityClick(city)">
            <span>{{ city.cityName }}</span>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.city_group {
  padding: 10px 16px;

  .hot_cities {

    .city_all {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 15px 8px 15px 0;
      .city_item {
        width: 70px;
        height: 28px;
        border-radius: 14px;
        font-size: 12px;
        color: #000;
        text-align: center;
        line-height: 28px;
        background-color: #fff4ec;
        margin: 6px 0;
      }
    }
  }
  .city_title {
    display: flex;
    align-items: center;
    height: 44px;
  }

  .city {
    .city_item {
      display: flex;
      align-items: center;
      height: 44px;
      box-sizing: border-box;
      border-bottom: 1px solid #f2f3f5;
      background-color: #fff;

      span {
        font-size: 14px;
        color: #323232;
      }
    }
  }
}</style>
