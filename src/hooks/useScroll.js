import { onMounted, onUnmounted, ref } from "vue"

// export default function useScroll(reachBottomCB) {
//   const scrollListenerHandler = () => {
//     const clientHeight = document.documentElement.clientHeight
//     const scrollTop = Math.ceil(document.documentElement.scrollTop)
//     const scrollHeight = document.documentElement.scrollHeight
//     if (clientHeight + scrollTop >= scrollHeight) {
//       // 执行回调函数
//       reachBottomCB()
//     }
//   }
//   // 进入组件时监听
//   onMounted(() => {
//     window.addEventListener("scroll", scrollListenerHandler)
//   })
  
//   // 离开组件时候调用window.removeEventListener()方法移除监听
//   onUnmounted(() => {
//     window.removeEventListener("scroll", scrollListenerHandler)
//   })
// }

export default function useScroll() {
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scollHeight = ref(0)
  const scrollListenerHandler = () => {
    clientHeight.value = document.documentElement.clientHeight
    scrollTop.value = Math.ceil(document.documentElement.scrollTop)
    scollHeight.value = document.documentElement.scrollHeight
    if (clientHeight.value + scrollTop.value >= scollHeight.value) {
      // 改变isReachBottom的状态
      isReachBottom.value = true
    }
  }
  // 进入组件时监听
  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler)
  })
  
  // 离开组件时候调用window.removeEventListener()方法移除监听
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler)
  })

  return {
    isReachBottom,
    clientHeight,
    scrollTop,
    scollHeight
  }
}

