import zhRequest from "../request"

export function getDetail(houseId) {
  return zhRequest.request({
    url: "detail/infos",
    params: {
      houseId
    }
  })
}