import zhRequest from "../request"

export function getHotSuggests() { 
  return zhRequest.request({
    url: "/home/hotSuggests",
    method: 'GET',
  })
}

export function getCategories() {
  return zhRequest.request({
    url: "/home/categories",
    method: 'GET',
  })
}
export function getHouseList(page) {
  return zhRequest.request({
    url: "/home/houselist",
    method: 'GET',
    params: {
      page
    }
  })
}