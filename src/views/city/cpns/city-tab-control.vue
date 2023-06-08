<script setup>
  import { ref } from "vue"

  // 定义props
  const props = defineProps({
    allCity: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: String,
      default: ""
    }
  })
  // 发送自定义事件
  const emits = defineEmits(["update:modelValue"])

  const tabsItemClick = (index, title) => {
    // 发射事件，传递title
    emits("update:modelValue", title)

    // active动画
    styles.value.transform = `translateX(${94 + index * 186}px) translateX(-50%)`
  }
  const styles = ref({
    transform: 'translateX(94px) translateX(-50%)'
  })
</script>

<template>
  <div class="tab_control">
    <template v-for="(value, key, index) in allCity" :key="key">
      <div class="tabs_item" @click="tabsItemClick(index, key)">
        {{ value.title }}
      </div>
    </template>
    <div class="tabs_line" :style="styles"></div>
  </div>
</template>

<style lang="less" scoped>
/* .tab_control样式 */
.tab_control {
  display: flex;
  width: 100%;
  height: 44px;
  line-height: 44px;
  position: relative;

  .tabs_item {
    flex: 1;
    color: #646566;
    text-align: center;
    font-size: 14px;
  }

  .tabs_line {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
    width: 40px;
    height: 3px;
    background-color: rgb(255, 152, 84);
    transition: all .5s;
    border-radius: 3px;
  }
  
}
</style>
