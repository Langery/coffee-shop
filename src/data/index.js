// Product data class using ES6 class syntax
class Product {
  constructor({ id, name, shortDesc, image, tag, price, unit, description }) {
    this.id = id
    this.name = name
    this.shortDesc = shortDesc
    this.image = image
    this.tag = tag
    this.price = price
    this.unit = unit
    this.description = description
  }
}

// Description block types
const DescType = {
  INTRO: 'intro',
  SUBTITLE: 'subtitle',
  TEXT: 'text'
}

// Create description blocks using factory functions
const intro = (text) => ({ type: DescType.INTRO, text })
const subtitle = (text) => ({ type: DescType.SUBTITLE, text })
const text = (text, bold = false) => ({ type: DescType.TEXT, text, bold })

// Product catalog using ES6 Map for O(1) lookup
const productCatalog = new Map([
  ['pour-over', new Product({
    id: 'pour-over',
    name: '手冲单品咖啡',
    shortDesc: '精选来自埃塞俄比亚、哥伦比亚、危地马拉等产区的单一产地咖啡豆...',
    image: './assets/product-1.jpg',
    tag: '招牌产品',
    price: '¥48',
    unit: '/ 杯',
    description: [
      intro('我们相信，每一杯咖啡都有自己的故事。手冲单品咖啡是我们店内的招牌产品，由经过专业训练的咖啡师亲手冲泡，为您呈现每一款咖啡豆最纯粹的风味。'),
      subtitle('关于咖啡豆'),
      text('我们精选来自埃塞俄比亚耶加雪菲的柑橘风味、哥伦比亚考卡苏产的坚果巧克力香、危地马拉安提瓜的均衡酸质，以及巴拿马翡翠庄园的瑰夏花香，每一款都经过严格筛选，确保品质卓越。'),
      subtitle('冲泡工艺'),
      text('采用V60手冲滤杯配合蛋糕滤纸，水温控制在92-94°C，萃取时间约2分30秒。我们会根据每一款豆子的特性调整研磨度、粉水比，确保您喝到的每一口都是最佳状态。'),
      subtitle('品鉴建议'),
      text('建议在咖啡温热时饮用，先闻其香气，再小口品尝，感受不同温度下风味的变化。最佳饮用时间为出品后15分钟内。')
    ]
  })],
  ['latte', new Product({
    id: 'latte',
    name: '特色创意饮品',
    shortDesc: '季节限定的创意咖啡特调，如桂花拿铁、柚子冷萃、抹茶红豆冰雅哈...',
    image: './assets/product-2.jpg',
    tag: '季节限定',
    price: '¥38',
    unit: '起 / 杯',
    description: [
      intro('当经典咖啡遇见在地风味，我们创造出独特的味觉体验。每款创意饮品都由我们的咖啡师精心研发，将传统咖啡与季节食材完美融合。'),
      subtitle('人气单品'),
      text('桂花拿铁：选用秋季新鲜桂花与意式浓缩融合，顶部撒上金桂花瓣，香气温润。冬季限定款，每年9-11月供应。', true),
      text('柚子冷萃：16小时低温萃取的单品冷萃，加入新鲜柚子果酱，酸甜清爽。夏季消暑首选。', true),
      text('抹茶红豆冰雅哈：日式抹茶与意式阿芙佳朵的创意碰撞，淋上蜜红豆与淡奶，口感丰富。', true),
      subtitle('定制服务'),
      text('我们提供糖度、温度、咖啡因含量的个性化调整。您也可以告诉我们您的口味偏好，我们的咖啡师会为您推荐或定制专属饮品。')
    ]
  })],
  ['afternoon-tea', new Product({
    id: 'afternoon-tea',
    name: '精品下午茶套餐',
    shortDesc: '包含手工甜点、季节果盘与指定饮品，适宜闺蜜小聚、商务洽谈...',
    image: './assets/product-3.jpg',
    tag: '双人套餐',
    price: '¥128',
    unit: '/ 双人',
    description: [
      intro('忙碌生活中的片刻奢侈，一场视觉与味觉的双重享受。我们的下午茶套餐精选优质食材，由专业甜点师当日手工制作，为您呈现精致的仪式感。'),
      subtitle('套餐内容'),
      text('英式司康：外酥内软，搭配德文郡奶油与自制草莓酱', true),
      text('法式马卡龙：口味随机（草莓、抹茶、巧克力、焦糖），每日新鲜制作', true),
      text('季节水果塔：精选当季水果，搭配杏仁塔皮与香草卡仕达酱', true),
      text('指定饮品：可选手冲咖啡或进口花茶（壶）', true),
      subtitle('适合场景'),
      text('闺蜜聚会、商务洽谈、纪念日庆祝、独自放空。套餐为双人份量，也可单点甜点或饮品。'),
      subtitle('预约服务'),
      text('周末及节假日建议提前1天预约。特殊节日（情人节、圣诞等）需提前3天预约并支付定金。')
    ]
  })]
])

// Export products as array and getter functions
export const products = [...productCatalog.values()]

export const getProductById = (id) => productCatalog.get(id)

export const hasProductId = (id) => productCatalog.has(id)

// Menu items using object shorthand
export const menuItems = [
  { name: '手冲单品（任选产区）', price: '¥48' },
  { name: '桂花拿铁（季节限定）', price: '¥38' },
  { name: '精品下午茶套餐', price: '¥128' }
]

// About text
export const aboutText = [
  '拾光咖啡创立于2018年，源于创始人对咖啡的热爱与对慢生活的向往。我们相信，一杯好咖啡不仅是味觉的享受，更是心灵的片刻栖息。',
  '店名"拾光"寓意在忙碌的城市生活中，拾起那些被忽略的美好时光。我们精选全球优质咖啡豆，坚持手工冲泡，为每一位顾客呈现咖啡最纯粹的风味。',
  '在这里，您可以独自享受一本好书，也可以与三五好友畅聊人生。拾光咖啡，愿成为您在城市中的温暖港湾。'
]

// Contact info using shorthand property names
export const contactInfo = {
  address: '北京市朝阳区三里屯路19号院7号楼一层',
  phone: '010-6417-****',
  wechat: 'CoffeeT****',
  hours: '周一至周五 8:00–21:00 / 周六至周日 9:00–22:00'
}

// Social links with computed icon getter
export const socialLinks = [
  { name: '微信', icon: 'wechat' },
  { name: '微博', icon: 'weibo' },
  { name: '小红书', icon: 'xiaohongshu' }
]

// Social icons map
export const socialIcons = {
  wechat: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 11c-.83 0-1.5-.67-1.5-1.5S7.67 8 8.5 8s1.5.67 1.5 1.5S9.33 11 8.5 11zm5 0c-.83 0-1.5-.67-1.5-1.5S12.67 8 13.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 14c-2.33 0-4.31 1.17-5.5 2.93.03-.32.09-.63.18-.93C7.39 14.6 9.51 13.5 12 13.5s4.61 1.1 5.32 2.5c.09.3.15.61.18.93-1.19-1.76-3.17-2.93-5.5-2.93zm-2.5-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/></svg>`,
  weibo: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.098 20c-4.612 0-8.348-2.689-8.348-6 0-1.747.924-3.648 2.514-5.34 1.737-1.85 3.914-2.817 6.146-2.724 0 0 .223.038.618.108 1.194.214 1.879.265 2.052.265.173 0 .293-.021.293-.021.048-.006.096-.012.144-.02 1.53-.272 3.022-.18 4.195.261-.063-.268-.123-.533-.177-.788C16.178 3.276 13.252 1.715 9.764 1.715c-.19 0-.381.005-.57.014C4.768 2.099 1.5 5.786 1.5 10.25c0 4.311 3.736 8 8.348 8 3.288 0 6.127-1.932 7.402-4.748-.326.057-.657.088-.992.088-.83 0-1.63-.248-2.276-.696.173.022.343.036.516.036 1.654 0 3-1.346 3-3 0-.196-.025-.386-.071-.568.214.095.443.147.682.147 1.102 0 2-.898 2-2 0-.671-.329-1.263-.833-1.616.139.046.283.09.432.132-.004-.012-.009-.024-.011-.037-.018-.104-.027-.208-.027-.314 0-2.211 1.789-4 4-4 .368 0 .725.05 1.062.145C21.37 3.292 22 4.559 22 6c0 2.757-2.243 5-5 5-.276 0-.547-.022-.811-.065.41.825.656 1.77.656 2.772 0 2.206-1.794 4-4 4-1.102 0-2.106-.448-2.838-1.175.035.005.069.013.103.017-.174-.112-.335-.245-.478-.398-.028-.029-.056-.057-.082-.087-.02-.023-.039-.047-.058-.071-.019-.024-.036-.049-.053-.074-.003-.005-.007-.01-.01-.015-.005-.006-.015-.021-.026-.041zm.702-3.868c1.404 0 2.545-1.134 2.545-2.534s-1.141-2.534-2.545-2.534c-1.404 0-2.545 1.134-2.545 2.534s1.141 2.534 2.545 2.534zm0-3.868c.736 0 1.335.596 1.335 1.334 0 .738-.599 1.334-1.335 1.334-.736 0-1.335-.596-1.335-1.334 0-.738.599-1.334 1.335-1.334z"/></svg>`,
  xiaohongshu: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`
}

// Export DescType for use in components
export { DescType }