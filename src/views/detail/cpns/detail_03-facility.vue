<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue"
defineProps({
  houseFacility: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <div class="facility">
    <detail-section title="房屋设施" more-text="查看全部设施">
     <div class="facility-inner">
      <template v-for="(item, index) in houseFacility.houseFacilitys" :key="index">
        <div class="facility_item" v-if="houseFacility.facilitySort?.includes(index)">
          <div class="facility_name">
            <img class="img" :src="item.icon" alt="">
            <div class="text">{{ item.groupName }}</div>
          </div>
          <div class="facility_value">
          <template v-for="(value, index) in item.facilitys.slice(0, 4)" :key="index">
            <div class="facility_value_item">
              <span>{{ value.name }}</span>
            </div>
          </template>
        </div>
        </div> 
      </template>
     </div>
    </detail-section>
  </div>
</template>

<style lang="less" scoped>
  .facility-inner {
    // 触发BFC
    overflow: auto; 
    border-radius: 6px;
    background-color: #f7f9fb;


    .facility_item {
      display: flex;
      margin: 25px 0;
      .facility_name {
        width: 90px;
        text-align: center;
        .img {
          width: 20px;
        }
        .text {
          margin-top: 5px;
          color: #000;
          font-size: 12px;
        }
      }
      .facility_value {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        .facility_value_item {
          display: flex;
          align-items: center;
          margin: 4px 0;
          width: 50%;
          &::before {
            content: "";
            display: block;
            width: 12px;
            height: 12px;
            margin: 0 6px;
            background: url(../../../assets/img/detail/icon_check.png) no-repeat 100%/100% 
          }
          span {
            font-size: 12px;
            color: #000;
          }
        }
      }

    }
  } 
</style>
