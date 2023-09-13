<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue"

defineProps({
  landlordModule: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <div class="landlord">
    <detail-section title="房东介绍" more-text="查看房东主页">
      <div class="landlord-inner">
        <div class="top">
          <img :src="landlordModule.topScroll" alt="">
        </div>
        <div class="header">
          <div class="header-left">
            <img :src="landlordModule.hotelLogo" alt="">
           <div class="introduce">
            <div class="hotelName">
              {{ landlordModule.hotelName }}
            </div>
            <div class="hotelTags">
              <template v-for="(item, index) in landlordModule.hotelTags" :key="index">
                <div class="item" :style="{color: item.tagText.color}">
                  {{ item.tagText.text }}
                </div>
              </template>
            </div>
           </div>
          </div>
          <div class="header-right">
            <div class="phone">联系房东</div>
          </div>
        </div>
        <div class="bottom">
          <div class="hotelSummary">
            <template v-for="(item, index) in landlordModule.hotelSummary" :key="index">
            <div class="item">
              <span class="title">{{ item.title }}</span>
              <span class="introduction">{{ item.introduction }}</span>
              <span class="tip">{{ item.tip }}</span>
            </div>
          </template>
          </div>
        </div> 
      </div>
    </detail-section>
  </div>
</template>

<style lang="less" scoped>
.landlord-inner {
  .top {
    img {
      width: 100%;
      border-radius: 4px;
    }
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    .header-left {
      display: flex;
      img {
        width: 54px;
        height: 54px;
      }
      .introduce {
        .hotelName {
        margin: 7px 0;
        font-size: 16px;
        font-weight: var(--primary-weight);
        color: #000;
      }
      .hotelTags {
        display: flex;
        .item {
          padding-right: 5px;
          margin-left: 5px;
          border-right: 2px solid;
          font-size: 12px;
          &:last-child {
            border: none;
          }
          &:first-child {
            margin-left: 0;
          }
        }
      }
      }
    }
    .header-right {
      .phone {
        width: 72px;
        height: 24px;
        line-height: 24px;
        border-radius: 5px;
        text-align: center;
        font-size: 12px;
        background: linear-gradient(90deg, #ff9854, #fcaf3f);
        color: #fff;
      }
    }
  }
  .bottom { 
    margin-top: 40px;
    .hotelSummary {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      .item {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        .title {
          color: #999;
        }
        .introduction {
          margin: 5px 0;
          font-weight: var(--primary-weight);
          font-size: 18px;
          color: #333;
        }
        .tip {
          color: #666;
        }
      }
    }
  }
}
</style>
