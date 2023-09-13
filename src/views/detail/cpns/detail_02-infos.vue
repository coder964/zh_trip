<script setup>
const props = defineProps({
  infosData: {
    type: Object,
    default: () => ({})
  }
})  
</script>

<template>
  <div class="infos">
    <div class="houseName">
      {{ infosData.houseName }}
    </div>
    <div class="houseTags">
      <template v-for="(item, index) in infosData.houseTags" :key="index">
        <span 
          class="tag_item"
          v-if="item.tagText"
          :style="{color: item.tagText.color, background: item.tagText.background.color}"
        >
          {{ item.tagText.text }}
        </span>
      </template>
    </div>
    <div class="commentBrief extra">
      <div class="comment_left">
        <span class="overall">{{ infosData.commentBrief?.overall }}</span>
        <span class="scoreTitle">{{ infosData.commentBrief?.scoreTitle  }}</span>
        <span class="description">{{ infosData.commentBrief?.commentBrief }}</span>
      </div>
      <div class="comment_right">
        <span class="totalCount">{{ infosData.commentBrief?.totalCount }}条评论</span>
        <i class="iconfont icon-youjiantou"></i>
      </div>

    </div>
    <div class="position extra">
      <div class="left">
        {{ infosData.nearByPosition?.address }}
      </div>
      <div class="right">
        <span>地图·周边</span>
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.infos {
  padding: 16px;
  .houseName {
    font-size: 20px;
    color: #333;
    margin-bottom: 5px;
    font-weight: bold;
  } 
  .houseTags {
    margin: 10px 0;
    font-size: 12px;
    .tag_item {
      margin: 0px 2px;
      padding: 1px 3px;
    }
  }
  .extra {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    margin: 12px 0;
    border-radius: 5px;
    background-color: #f5f7fa;
  }
  .commentBrief {
    .comment_left {
      color: #333;
      font-size: 12px;
      .overall {
        font-size: 18px;
        font-weight: 700;

      }
      .scoreTitle {
        margin: 0 3px;
        font-weight: 700;

      }
      .description {
        color: #666;
      }
    }
    .comment_right {
      font-size: 12px;
      color: var(--primary-color);
    }
  }
  .position {
    .left {
      font-size: 14px;
      color: #333;
      font-weight: 700;
    }
    .right {
      font-size: 12px;
      color: var(--primary-color); 
    }
  }

} 
</style>
