<script setup>
import { onMounted, ref } from "vue";
import DetailSection from "@/components/detail-section/detail-section.vue";

const props = defineProps({
  position: {
    type: Object,
    default: () => ({})
  }
})

const mapRef = ref();

// 在生命周期中进行地图的相关操作
onMounted(() => {
  // console.log(props.position);
  const map = new BMapGL.Map(mapRef.value); // 创建地图实例 
  const point = new BMapGL.Point(props.position?.longitude, props.position?.latitude); // 创建点坐标 
  map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
  const marker = new BMapGL.Marker(point);  
  map.addOverlay(marker)
})
</script>

<template>
  <div class="home">
    <detail-section title="位置周边" more-text="查看更多周边信息">
      <div class="baidu" ref="mapRef"></div>
    </detail-section>
  </div>
</template>

<style scoped>
.baidu {
  height: 240px;
}
</style>
