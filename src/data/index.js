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
      intro('我们相信，每一杯咖啡都有自己的故事。手冲单品咖啡是我们店内的招牌产品，由经过专业训练的咖啡师亲手冲泡，为您呈现每一款咖啡豆独特的风味特征。'),
      subtitle('关于咖啡豆'),
      text('我们精选来自埃塞俄比亚耶加雪菲的柑橘风味、哥伦比亚考卡苏产的坚果巧克力香、危地马拉安提瓜的均衡酸质，以及巴拿马翡翠庄园的瑰夏风味。每一款豆子都经过精心烘焙和品鉴。'),
      subtitle('冲泡工艺'),
      text('采用V60手冲滤杯配合蛋糕滤纸，水温控制在92-94°C，萃取时间约2分30秒。我们会根据每一款豆子的特性调整研磨度、粉水比，确保您喝到的是咖啡的最佳风味。'),
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
  '店名"拾光"寓意在忙碌的城市生活中，拾起那些被忽略的美好时光。我们精选全球优质咖啡豆，坚持手工冲泡，为每一位顾客呈现咖啡最纯粹的风味特征。',
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
  wechat: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 11c-.83 0-1.5-.67-1.5-1.5S7.67 8 8.5 8s1.5.67 1.5 1.5S9.33 11 8.5 11zm5 0c-.83 0-1.5-.67-1.5-1.5S12.67 8 13.5 8s1.5.67 1.5 1.5S14.33 11 13.5 11zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`,
  weibo: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.098 20c-4.612 0-8.348-2.689-8.348-6 0-1.747.924-3.648 2.514-5.34 1.737-1.85 3.914-2.817 6.146-2.724 0 0 .223.038.618.108 1.194.197 2.062.674 2.437 1.378.156.303.195.65.117 1.03a2.22 2.22 0 01-.57 1.097c-.358.386-.883.651-1.566.791.18.167.34.356.476.562.355.549.553 1.24.584 2.055.067 1.681-.458 3.516-1.56 5.333C9.65 19.34 9.87 20 10.098 20zm-4.23-6.23c.295.51.907 1.013 1.736 1.366 1.025.43 2.324.588 3.673.44 1.368-.152 2.644-.636 3.529-1.34-.246.035-.476.052-.68.052-2.264 0-4.1-1.533-4.1-3.423 0-.556.12-1.087.34-1.572-.88.296-1.65.852-2.16 1.548-.577.808-.872 1.755-.738 2.929zm11.066-8.76a2.816 2.816 0 00-2.818 2.814c0 1.554 1.264 2.814 2.818 2.814 1.554 0 2.817-1.26 2.817-2.814 0-1.554-1.263-2.814-2.817-2.814zm.49 4.104h-1.47v-.75h1.47v.75zm0-1.312h-1.47v-.75h1.47v.75z"/></svg>`,
  xiaohongshu: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`
}

// Export DescType for use in components
export { DescType }
