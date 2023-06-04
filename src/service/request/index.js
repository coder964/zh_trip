import axios from "axios"

import { BASE_URL, TIMEOUT } from "./config"

class ZHRequest {
  constructor(baseURL, timeout = 5000) {
    this.instance = axios.create({
      baseURL,
      timeout
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


