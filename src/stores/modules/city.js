import { defineStore } from "pinia"

// 网络请求
import { getCityAll } from "@/service"

const useCityStore = defineStore("city" ,{
  state: () => ({
    allCity: {},
    currentCity: {
      cityName: "广州"
    }
  }),
  actions: {
    async fetchAllCityData() {
      const res = await getCityAll() 
      this.allCity = res.data
    }
  }
})

export default useCityStore