import zhRequest from "../request"

export function getCityAll() {
  return zhRequest.request({
    url: "/city/all"
  })
}
