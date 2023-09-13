import { defineStore } from "pinia"

import { getDetail } from "@/service/modules/detail"

const useDetailStore = defineStore("detail", {
  state: () => ({ 
    mainPart: {},
    currentIndex: -1,
  }),
  actions: {
    async fetchDetailData(houseId) {
      const res = await getDetail(houseId) 
      this.mainPart = res.data.mainPart
    }
  }
})

export default useDetailStore