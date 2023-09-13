<script setup>
import { computed, ref, onMounted, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import useDetailStore from "@/stores/modules/detail"

import DetailSwiper from "./cpns/detail_01-swiper.vue"
import DetailInfos from "./cpns/detail_02-infos.vue"
import DetailFacility from "./cpns/detail_03-facility.vue"
import DetailLandlord from "./cpns/detail_04-landlord.vue"
import DetailComment from "./cpns/detail_05-comment.vue"
import DetailNotice from "./cpns/detail_06-notice.vue"
import DetailMap from "./cpns/detail_07-map.vue"
import tabControl from "@/components/tab-control/tab-control.vue"
import DetailIntro from "./cpns/detail_08-intro.vue"
import useScroll from "@/hooks/useScroll"

const route = useRoute()
const router = useRouter()
const btnClick = () => {
  // 回退
  router.back()
}
// 当前房屋的id信息
const houseId = route.params.id
const detailDtore = useDetailStore()
// 调用action发起网络请求
detailDtore.fetchDetailData(houseId)
const {
  mainPart,
} = storeToRefs(detailDtore)

// 轮播图数据 
const swipeData = computed(() => mainPart.value.topModule?.housePicture.housePics)
// infos数据
const infosData = computed(() => mainPart.value.topModule)
// 房屋设施
const houseFacility = computed(() => mainPart.value.dynamicModule?.facilityModule.houseFacility)
// 房东介绍
const landlordModule = computed(() => mainPart.value.dynamicModule?.landlordModule)
// 热门评论a
const commentModule = computed(() => mainPart.value.dynamicModule?.commentModule)
// 预定须知
const orderRules = computed(() => mainPart.value.dynamicModule?.rulesModule.orderRules)
// 地图
// const positionModule = computed(() => mainPart.dynamicModule?.positionModule)
// 价格说明
const priceIntro = computed(() => mainPart.value.introductionModule)

// 导航
// const sectionEls = []
// const getSctionRef = (value) => {
//   sectionEls.push(value.$el)
// }

// // tabControl相关的操作
// const detailRef = ref()
// const { scrollTop } = useScroll(detailRef)
// const showTabControl = computed(() => {
//   // 这里执行时DOM还没有挂在，sectionEls[0]也是拿不到元素的，所以需要使用?.语法
//   return scrollTop.value >= sectionEls[0]?.offsetTop - 44
// })

// const tabClick = (index) => {
//   // console.log(index);
//   detailRef.value.scrollTo({
//     top: sectionEls[index].offsetTop - 44,
//     behavior: "smooth",
//   })
// }

const sectionEls = ref({})

const getSctionRef = (value) => {
  if(!value) return
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}

// 导航的标题获取
const names = computed(() => {
  return Object.keys(sectionEls.value)
})


// tabControl相关的操作
const detailRef = ref()
const values = ref([])  //存储tab-control的offsetTop
const tabControlRef = ref()  //存储tab-control组件
let isClick = false //判断是否为点击tab-control来跳转滚动条的方式，默认不是
let currentDistance = -1 //记录点击tab-control时滚动的具体距离
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  // 这里执行时DOM还没有挂在，sectionEls[0]也是拿不到元素的，所以需要使用?.语法
  return scrollTop.value >= sectionEls.value[names.value[0]]?.offsetTop - 44
})

const tabClick = (index) => {
  const key = names.value[index]
  const el = sectionEls.value[key]
  const instance = el.offsetTop - 44

  isClick = true //点击tab-control时修改isClick
  currentDistance = instance

  detailRef.value.scrollTo({
    top: instance,
    behavior: "smooth",
  })
}

onMounted(() => {
  //1. 拿到tab-control的offsetTop
  for(const key in sectionEls.value) {
    const el = sectionEls.value[key]
    const top = el.offsetTop - 44
    values.value.push(top)
  }
  // console.log(values.value.length)  //Proxy(Array) {0: 488, 1: 849, 2: 1197, 3: 1602, 4: 1836}
})
watch(scrollTop, (newValue, oldValue) => {
  if(parseInt(newValue) == currentDistance) {
    isClick = false
  }
  if(isClick) return 
  
  // 2. 根据newValue去匹配想要的索引
  // if(isTure.value) return 
  let indey = values.value.length - 1
  // console.log(indey);  //4
  for(let i = 0; i < values.value.length; i++) {
    const value = values.value[i]
    if(value > newValue) {
      indey = i - 1
      break  //因为每次只需要找到第一个，所以一定要加break
    }
  }
  // console.log(indey.value);
  tabControlRef.value?.setCurrentIndex(indey)
})



</script> 

<template>
  <div class="detail" ref="detailRef">
    <tab-control 
      :titles="names"
      v-if="showTabControl" 
      class="tabs"
      @tabItemClick="tabClick"
      ref="tabControlRef"
    />
    <div class="top">
      <div class="back" @click="btnClick">
        <i class="iconfont icon-zuojiantou"></i>
        <span>旅途</span>
      </div>    
      <div class="title">房屋详情</div>
    </div>
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <!-- 轮播图 -->
      <detail-swiper :swipe-data="swipeData"/>
      <!-- 信息 -->
      <detail-infos :infos-data="infosData"/>
      <detail-facility name="设施" :ref="getSctionRef" :house-facility="houseFacility"/>
      <detail-landlord name="房东" :ref="getSctionRef" :landlord-module="landlordModule"/>
      <detail-comment name="评论" :ref="getSctionRef" :comment-module="commentModule"/>
      <detail-notice name="须知" :ref="getSctionRef" :order-rules="orderRules"/>
      <detail-map name="周边" :ref="getSctionRef" :position="mainPart.dynamicModule.positionModule"/>
      <detail-intro :price-intro="priceIntro"/>
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.detail {
  height: 100vh;
  overflow-y: auto;
}
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
  background: #fff;
}
.top {
  display: flex;
  position: relative;
  line-height: 46px;
  justify-content: center;

  .back {
    position: absolute;
    left: 0;
    padding: 0 15px;
    font-size: 14px;
    color: var(--primary-color);

    span {
      margin-left: 3px;
      font-size: 15px;
    }
  }

  .title {
    font-size: 16px;
    margin-top: 1px;
  }
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
