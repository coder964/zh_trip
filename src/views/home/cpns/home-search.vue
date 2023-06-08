<script setup>
import { ref } from "vue"
import { computed } from "vue"
import { useRouter } from "vue-router"
import useCityStore from "@/stores/modules/city"
// import 
import { formatMonthDay, getDiffDays } from "@/utils/format_data"

const router = useRouter()
const cityClick = () => {
  router.push({
    path: "/city"
  })
}

// 定义props
const props = defineProps({

  // 热门建议的数据 
  hotSuggests: {
    type: Array,
    default: () => ({})
  },

})

// 获取位置
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(res => {
    console.log("获取位置成功:", res)
  }, err => {
    console.log("获取位置失败:", err)
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  })
}

// 当前城市的处理
const cityStore = useCityStore()
const currentCity = computed(() => cityStore.currentCity.cityName)

// 日期范围的处理
const nowDate = new Date()
const newDate = new Date()
newDate.setDate(nowDate.getDate() + 1)
  // 格式化初始开始日期
const startDate = ref(formatMonthDay(nowDate))
  // 格式化初始结束日期
const endDate = ref(formatMonthDay(newDate))

  // 初始天数计算
const stayCount = ref(getDiffDays(nowDate, newDate))

const showCalendar = ref(false)

  // 选择日历中的日期结果处理
const onConfirm = (value) => {
    // 1.设置日期
  const selectStartDate = value[0]
  const selectEndDate = value[1]
    // 格式化开始时间
  startDate.value = formatMonthDay(selectStartDate)
    // 格式化结束时间
  endDate.value = formatMonthDay(selectEndDate)
    // 计算天数
  stayCount.value = getDiffDays(selectStartDate, selectEndDate)
    // 2.隐藏日历
  showCalendar.value = false
}

// 开始搜索功能
const searchBtnClick = () => {
  // 跳转路由并传递参数(参数：开始时间，结束时间，城市)
  router.push({
    path: "/search",
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value
    }
  })
}

</script>

<template>
  <!-- 位置 -->
  <div class="location">
    <div class="city" @click="cityClick">{{ currentCity }}</div>
    <div class="position">
      <span class="text" @click="positionClick">我的位置</span>
      <img src="@/assets/img/home/icon_location.png" alt="">
    </div>
  </div>

  <!-- 日期范围 -->
  <div class="section date-range" @click="showCalendar = true">
    <div class="start">
      <div class="date">
        <span class="tip">入住</span>
        <span class="time">{{ startDate }}</span>
      </div>
    </div>
    <div class="stay">共{{ stayCount }}晚</div>
    <div class="end">
      <div class="date">
        <span class="tip">离店</span>
        <span class="time">{{ endDate }}</span>
      </div>
    </div>
  </div>
  <!-- 日期选择 -->
  <van-calendar 
    v-model:show="showCalendar" 
    type="range" 
    color="#ff9854" 
    :round="false" 
    :show-confirm="true"
    @confirm="onConfirm" 
  />

  <!-- 价格/人数选择 -->
  <div class="section price-counter">
    <div class="start">价格不限</div>
    <div class="end">人数不限</div>
  </div>

  <!-- 关键字 -->
  <div class="section keyword">关键字/位置/民宿名</div>

  <!-- 热门建议 -->
  <div class="section hot_suggests">
    <template v-for="(item, index) in hotSuggests" :key="index">
       <div class="hot_suggests_item">{{ item.tagText.text }}</div>
    </template>
  </div>

  
  <!-- 搜索按钮 -->
  <div class="section search-btn">
    <div class="btn" @click="searchBtnClick">开始搜索</div>
  </div>

</template>

<style lang="less" scoped>
.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city {
    flex: 1;
    font-size: 14px;
    color: #333;
  }

  .position {
    width: 74px;
    display: flex;
    align-items: center;

    .text {
      position: relative;
      top: 2px;
      color: #666;
      font-size: 12px;
    }

    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.date-range {
  height: 44px;

  .stay {
    flex: 1;
    margin-left: 30px;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  .start {
    border-right: 1px solid  #faf8f9;
  }
}
.hot_suggests {
  margin-top: 10px;
  height: auto;
  .hot_suggests_item {
    line-height: 20px;
    box-sizing: border-box;
    border-radius: 14px;
    padding: 0 10px;
    margin: 4px;
    text-align: center;
    font-size: 12px;
    background-color: #F1F3F5;
    color: #3F4954;
  }
}

.search-btn {
  margin-top: 10px;
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}


</style>
