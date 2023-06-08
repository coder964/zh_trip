<script setup>
  defineProps({
    // 推荐类别的数据
    categories: {
      type: Array,
      default: () => ({})
    }
  })
</script>

<template>
  <!-- 推荐类别 -->
  <div class="section categories">
    <template v-for="(item, index) in categories" :key="index">
      <div class="categories_item">
        <img :src="item.pictureUrl" alt="">
        <span>{{ item.title }}</span>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.categories {
  display: flex;
  height: auto;
  margin: 10px 20px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  .categories_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 70px;
    padding: 10px;

    img {
      width: 32px;
    }

    span {
      font-size: 12px;
      color: #000;
      margin-top: 8px;
    }
  }
}
</style>
