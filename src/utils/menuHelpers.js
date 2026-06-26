// 菜单分类的中文标签 (tabs 和 cards 共享)
export const CATEGORY_LABEL = {
  coffee: '咖啡',
  signature: '特色饮品',
  tea: '茶饮',
  dessert: '甜点',
  set: '套餐'
}

export const categoryLabel = (k) => CATEGORY_LABEL[k] || k

// 季节限定判断: 名字或简介含 "限定/限时/季节" 关键词
export const isLimited = (item) =>
  /季节限定|限定/.test(item.name) || /限时|季节/.test(item.shortDesc || '')

// 价格区间筛选: 从 "¥38 / 杯" 字符串里提取数字
export const parsePrice = (str) => {
  const m = String(str).match(/(\d+)/)
  return m ? parseInt(m[1]) : 0
}