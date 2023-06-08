import dayjs from "dayjs"

// 时间格式化
export function formatMonthDay(date, num) { 
  // 没有传递num参数时使用默认值0
  num = num ?? 0
  date = date.getTime() + num
  return dayjs(date).format("MM月DD日")
}

// 计算天数
// export function getDiffDays(startDate, endDate) {
//   return dayjs(endDate).diff(startDate, "day")
// }
export function getDiffDays(startDate, endDate) {
  // 将开始时间和结束时间转成时间戳格式，并计算
  const timestamp = endDate.getTime() - startDate.getTime()
  const oneDay = 24 * 60 * 60 * 1000
  // 换算成天数
  const days = timestamp / oneDay
  return days
}
