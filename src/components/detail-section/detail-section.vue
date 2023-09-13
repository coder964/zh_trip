<script setup>
defineProps({
  title: {
    type: String,
    default: "默认值"
  },
  moreText: {
    type: String,
    default: ""
  }
})
</script>

<template>
  <div class="detail-section">
    <div class="header">
      <div class="title">
        <h2>{{ title }}</h2>
      </div>
    </div>
    <div class="content">
      <slot>默认内容</slot>
    </div>
    <div class="footer" v-if="moreText.length">
      <div class="more">
        <span>{{ moreText }}</span>
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.detail-section {
  padding: 0 15px;
  margin-top: 12px;
  border-top: 5px solid #f2f3f4;

  .header {
    .title {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #eee;

      h2 {
        font-size: 20px;
        color: #333;
      }
    }
  }

  .content {
    margin-top: 10px;
  }

  .footer {
    margin-top: 9px;

    .more {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 44px;
      line-height: 44px;
      color: #ff9645;
      font-size: 14px;
      font-weight: 600;
    }
  }
}</style>
