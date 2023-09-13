import axios from "axios"
// 网络请求配置
import { BASE_URL, TIMEOUT } from "./config"
// mainStore
import useMainStore from "@/stores/modules/main"
const mainStore = useMainStore()
class ZHRequest {
  constructor(baseURL, timeout = 5000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    // 拦截器请求拦截
    this.instance.interceptors.request.use(config => {
      mainStore.isLoadingShow = true
      return config
    }, err => {
      return err
    })

    // 拦截器响应拦截
    this.instance.interceptors.response.use(res => {
      mainStore.isLoadingShow = false
      return res
    }, err => {
      mainStore.isLoadingShow = false
      return err
    })
  }
  
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default new ZHRequest(BASE_URL, TIMEOUT)


