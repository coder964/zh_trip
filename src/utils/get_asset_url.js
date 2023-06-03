const getAssetURL = (image) => {
  // 参数1：图片的相对路径
  // 参数2：当前路径的URL
  return new URL(`../assets/img/${image}`, import.meta.url).href
}

export default getAssetURL