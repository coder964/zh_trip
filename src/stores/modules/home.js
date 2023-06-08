import { defineStore } from "pinia"
import {
  getHotSuggests, 
  getCategories,
  getHouseList
}  from "@/service" 

const useHomeStore = defineStore("home", {
  state: () => ({ 
    // 热门建议的数据
    hotSuggests: [],
    // 推荐类别的数据
    categories: [],
    houseList: [],
    currentPage: 1,
  }),
  actions: {
    async fetchHotSuggestsData() {
      const res =  await getHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res =  await getCategories()
      this.categories = res.data
    },
    async fetchHouseListData() {
      const res = await getHouseList(this.currentPage)
      this.houseList.push(...res.data)
      this.currentPage++
    }
  }
})
export default useHomeStore