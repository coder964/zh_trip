<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue"  

const props = defineProps({
  commentModule: {
    type: Object,
    default: () => ({})
  }
})

</script>

<template>
  <div class="comment">
    <detail-section title="热门评论" :more-text="`查看全部${commentModule.totalCountStr}条评论`">
      <div class="comment-inner"> 
        <div class="header">
          <div class="header-left">
            <div class="score">
              <span class="text">{{ commentModule.overall }}</span>
              <div class="line"></div>
            </div>
            <div class="info">
              <div class="title">{{ commentModule.scoreTitle }}</div>
              <div class="count">{{ commentModule.totalCount }}条评论</div>
              <div class="star">
                <van-rate 
                  v-model="commentModule.overall"  
                  readonly
                  allow-half
                  color="#ff9645"
                  size="12"
                />
              </div>
            </div>
          </div>
          <div class="header-right">
            <template v-for="(item, index) in commentModule.subScores" :key="index">
              <span class="item">{{ item }}</span>   
            </template>
          </div>
        </div>


        <div class="tags">
          <template v-for="(item, index) in commentModule.commentTagVo" :key="index">
            <div 
              class="item"
              :style="{color: item.color, backgroundColor: item.backgroundColor}"  
            >
              {{ item.text }}
            </div>
          </template>
        </div>
        <div class="content">
          <div class="user">
            <div class="avatar">
              <img :src="commentModule.comment?.userAvatars" alt="">
            </div>
            <div class="profile">
              <div class="name">{{ commentModule.comment?.userName }}</div>
              <div class="date">{{ commentModule.comment?.checkInDate }}</div>
            </div>
          </div>
          <div class="text">
            {{ commentModule.comment?.commentDetail }}
          </div>
        </div>
      </div>
    </detail-section>
  </div>
</template>

<style lang="less" scoped>
.comment-inner {
  font-size: 12px;
  .header {
    display: flex;
    justify-content: space-between;
    .header-left {
      display: flex;
      .score {
        position: relative;
        .text {
          font-size: 48px;
          font-weight: var(--primary-weight);
          color: #333;
        }
        .line {
          position: absolute;
          bottom: 5px;
          z-index: 5;
          width: 66px;
          height: 6px;
          background: linear-gradient(90deg, #fa8c1d, #fcaf3f);
          border-radius: 3px;
        }
      }
      .info {
        margin-left: 19px;
        .title {
          margin-top: 4px;
          color: #333;
        }
        .count {
          margin: 3px 0;
          color: #999;
        }
      }
    }
    .header-right {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      flex: 1;
      .item {
        margin-left: 5px;
        color: #666;
      }
    }
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
    .item {
      margin: 5px 8px 0 0;
      padding: 3px 5px;
      border-radius: 8px;
    }
  }
  .content {
    padding: 10px;
    border-radius: 6px;
    background-color: #f7f9fb;
    .user {
      display: flex;
      .avatar {
        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
      }
      .profile {
        margin-left: 7px;
        .name {
          color: #000;
          font-size: 14px;
        }      
        .date {
          margin-top: 3px;
          color: #999;
        }
      }
    }
    .text {
      margin-top: 16px;
      color: #333;
    }
  } 
}
</style>
