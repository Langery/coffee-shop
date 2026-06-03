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
    image: '/coffee-shop/product-1.jpg',
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
    shortDesc: '季节限定的创意咖啡特调，如桂花拿铁、柚子冷萃、抹茶红豆冰沙...',
    image: '/coffee-shop/product-2.jpg',
    tag: '季节限定',
    price: '¥38',
    unit: '起 / 杯',
    description: [
      intro('当经典咖啡遇见在地风味，我们创造出独特的味觉体验。每款创意饮品都由我们的咖啡师精心研发，将传统咖啡与季节食材完美融合。'),
      subtitle('人气单品'),
      text('桂花拿铁：选用秋季新鲜桂花与意式浓缩融合，顶部撒上金桂花瓣，香气温润。冬季限定款，每年9-11月供应。', true),
      text('柚子冷萃：16小时低温萃取的单品冷萃，加入新鲜柚子果酱，酸甜清爽。夏季消暑首选。', true),
      text('抹茶红豆冰沙：日式抹茶与意式阿芙佳朵的创意碰撞，淋上蜜红豆与淡奶，口感丰富。', true),
      subtitle('定制服务'),
      text('我们提供糖度、温度、咖啡因含量的个性化调整。您也可以告诉我们您的口味偏好，我们的咖啡师会为您推荐或定制专属饮品。')
    ]
  })],
  ['afternoon-tea', new Product({
    id: 'afternoon-tea',
    name: '精品下午茶套餐',
    shortDesc: '包含手工甜点、季节果盘与指定饮品，适宜闺蜜小聚、商务洽谈...',
    image: '/coffee-shop/product-3.jpg',
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

// Menu items with full details
export const menuItems = [
  // 咖啡类
  {
    id: 'espresso',
    name: '浓缩咖啡 Espresso',
    price: '¥28',
    unit: '/ 杯',
    category: '咖啡',
    shortDesc: '意式咖啡的灵魂，浓郁的咖啡油脂带来强烈的风味冲击',
    description: '以高压热水萃取的浓缩咖啡，拥有丰厚的金棕色油脂（Crema），是所有意式咖啡的基底。我们选用中深度烘焙的阿拉比卡豆，呈现焦糖、坚果与可可的风味层次。',
    image: '/coffee-shop/menu-espresso.jpg'
  },
  {
    id: 'americano',
    name: '美式咖啡 Americano',
    price: '¥32',
    unit: '/ 杯',
    category: '咖啡',
    shortDesc: '浓缩与水的经典融合，口感清爽却不失咖啡本味',
    description: '双份浓缩加入热水稀释，保留咖啡风味的同时降低苦涩感。适合喜欢轻盈口感又不愿牺牲咖啡味道的客人。',
    image: '/coffee-shop/menu-americano.jpg'
  },
  {
    id: 'latte',
    name: '拿铁 Latte',
    price: '¥36',
    unit: '/ 杯',
    category: '咖啡',
    shortDesc: '丝绒般的奶泡与浓缩的完美平衡，温柔易饮',
    description: '双份浓缩注入打发细腻的温热牛奶，顶层铺有精心拉花的 latte art。我们使用燕麦奶或全脂牛奶可选，打造柔滑绵密的口感。',
    image: '/coffee-shop/menu-latte.jpg'
  },
  {
    id: 'cappuccino',
    name: '卡布奇诺 Cappuccino',
    price: '¥36',
    unit: '/ 杯',
    category: '咖啡',
    shortDesc: '三分之一浓缩、三分之一牛奶、三分之一奶泡的经典配比',
    description: '传统意大利式卡布奇诺，浓郁咖啡与丰盈奶泡的黄金比例。适合喜欢强烈咖啡风味与绵密奶泡交织的客人。',
    image: '/coffee-shop/menu-cappuccino.jpg'
  },
  {
    id: 'mocha',
    name: '摩卡 Mocha',
    price: '¥40',
    unit: '/ 杯',
    category: '咖啡',
    shortDesc: '巧克力与咖啡的浪漫邂逅，甜蜜与醇苦的交织',
    description: '浓缩、牛奶、巧克力酱与鲜奶油的组合，顶层可加可可粉装饰。适合嗜甜又爱咖啡的你。',
    image: '/coffee-shop/menu-mocha.jpg'
  },
  {
    id: 'flat-white',
    name: '馥芮白 Flat White',
    price: '¥38',
    unit: '/ 杯',
    category: '咖啡',
    shortDesc: '细腻微泡牛奶与双份ristretto的浓郁碰撞',
    description: '以双份ristretto为基底，注入细腻的微泡牛奶，咖啡风味更集中，口感更丝滑。源自澳洲的经典风味。',
    image: '/coffee-shop/menu-flat-white.jpg'
  },
  // 特色饮品
  {
    id: 'osmanthus-latte',
    name: '桂花拿铁（季节限定）',
    price: '¥38',
    unit: '/ 杯',
    category: '特色饮品',
    shortDesc: '秋季新鲜桂花与意式浓缩的融合，香气温润',
    description: '选用秋季新鲜桂花与意式浓缩融合，顶部撒上金桂花瓣。桂花的清香与咖啡的醇厚相互映衬，是每年9-11月的限时美味。',
    image: '/coffee-shop/menu-osmanthus-latte.jpg'
  },
  {
    id: 'grapefruit-cold',
    name: '柚子冷萃（季节限定）',
    price: '¥42',
    unit: '/ 杯',
    category: '特色饮品',
    shortDesc: '16小时低温萃取冷萃与新鲜柚子果酱的清爽组合',
    description: '16小时低温萃取的单一产地冷萃咖啡，加入新鲜柚子果酱。酸甜清爽，是夏季消暑的首选。冰凉沁心，回味悠长。',
    image: '/coffee-shop/menu-grapefruit-cold.jpg'
  },
  {
    id: 'matcha-red-bean',
    name: '抹茶红豆冰沙',
    price: '¥38',
    unit: '/ 杯',
    category: '特色饮品',
    shortDesc: '日式抹茶与意式阿芙佳朵的创意碰撞',
    description: '精选日本宇治抹茶与意式浓缩的创意融合，淋上蜜红豆与淡奶。抹茶的清苦、红豆的甜蜜、咖啡的醇厚，三重风味层层叠加。',
    image: '/coffee-shop/menu-matcha-red-bean.jpg'
  },
  // 茶类
  {
    id: 'matcha-latte',
    name: '抹茶拿铁',
    price: '¥35',
    unit: '/ 杯',
    category: '茶饮',
    shortDesc: '日式宇治抹茶与丝滑牛奶的融合，清苦回甘',
    description: '精选日本宇治抹茶粉，以茶筅打至细腻无结块，注入温热牛奶。入口是抹茶的清苦，回味是牛奶的柔滑，余韵悠长。',
    image: '/coffee-shop/menu-matcha-latte.jpg'
  },
  {
    id: 'hong-bao-tea',
    name: '红宝奶茶',
    price: '¥32',
    unit: '/ 杯',
    category: '茶饮',
    shortDesc: '南非国宝茶与玫瑰花的芬芳组合，天然无咖啡因',
    description: '以南非如意宝茶（ Rooibos）为基底，加入玫瑰花瓣与荔枝调味。天然无咖啡因，适合晚间饮用，养颜美容。',
    image: '/coffee-shop/menu-hong-bao-tea.jpg'
  },
  {
    id: 'jasmine-tea',
    name: '茉莉花茶（壶）',
    price: '¥45',
    unit: '/ 壶',
    category: '茶饮',
    shortDesc: '茉莉花与高山绿茶的多次窨制，香气馥郁',
    description: '精选福建高山绿茶与新鲜茉莉花经过七次窨制，花香茶香融为一体。茶汤清澈明亮，入口甘甜，适合两三好友共品。',
    image: '/coffee-shop/menu-jasmine-tea.jpg'
  },
  // 甜点
  {
    id: 'scone',
    name: '英式司康',
    price: '¥28',
    unit: '/ 个',
    category: '甜点',
    shortDesc: '外酥内软的英式传统点心，搭配德文郡奶油与草莓酱',
    description: '按照传统英式配方制作的司康，外酥内软，麦香浓郁。搭配德文郡奶油与自制草莓酱食用，是英式下午茶的经典组合。',
    image: '/coffee-shop/menu-scone.jpg'
  },
  {
    id: 'macaron',
    name: '法式马卡龙',
    price: '¥35',
    unit: '/ 块',
    category: '甜点',
    shortDesc: '酥脆外壳与柔软内芯的完美结合，每日新鲜制作',
    description: '法式马卡龙，酥脆的外壳包裹柔软的内心。我们提供多种口味：草莓、抹茶、巧克力、焦糖。每日新鲜制作，建议当天食用。',
    image: '/coffee-shop/menu-macaron.jpg'
  },
  {
    id: 'fruit-tart',
    name: '季节水果塔',
    price: '¥42',
    unit: '/ 个',
    category: '甜点',
    shortDesc: '酥脆塔皮搭配香草卡仕达与当季新鲜水果',
    description: '酥脆的杏仁塔皮，填入香草卡仕达酱，上铺当日精选的当季新鲜水果。酸甜平衡，精致美味。',
    image: '/coffee-shop/menu-fruit-tart.jpg'
  },
  // 套餐
  {
    id: 'afternoon-tea',
    name: '精品下午茶套餐',
    price: '¥128',
    unit: '/ 双人',
    category: '套餐',
    shortDesc: '英式司康、法式马卡龙、季节水果塔与指定饮品',
    description: '包含英式司康、法式马卡龙、季节水果塔，可选择手冲咖啡或进口花茶一壶。双人份量，附赠精美摆盘，为您呈现仪式感满满的下午茶体验。',
    image: '/coffee-shop/menu-afternoon-tea.jpg'
  },
  {
    id: 'coffee-set',
    name: '手冲咖啡套餐',
    price: '¥88',
    unit: '/ 套',
    category: '套餐',
    shortDesc: '任选产区手冲咖啡一杯，配精致小点',
    description: '可选择埃塞俄比亚耶加雪菲、哥伦比亚考卡苏、危地马拉安提瓜或巴拿马翡翠庄园瑰夏任意一款手冲咖啡，配精美小点一份。',
    image: '/coffee-shop/menu-coffee-set.jpg'
  }
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

// ============================================
// 咖啡师 (Baristas)
// ============================================
export const baristas = [
  {
    id: 'su',
    name: '苏先生',
    role: '主理人 / Head Roaster',
    initials: '苏',
    joined: '2018',
    from: '云南·普洱',
    quote: '好的咖啡，从豆子到杯子，每一步都不能急。',
    bio: '拾光咖啡的创始人，2010 年起在云南咖啡产区深耕，2018 年于北京三里屯创立拾光。擅长云南小粒种烘焙与意式拼配。',
    spec: ['云南小粒种', '意式拼配', '杯测师 Q-Grader']
  },
  {
    id: 'li',
    name: '李青',
    role: '咖啡总监 / Director',
    initials: '李',
    joined: '2019',
    from: '台湾·台北',
    quote: '萃取是一门精确到秒的艺术。',
    bio: '来自台北，2012 年起在台湾与日本多家精品咖啡馆担任咖啡师。拾光咖啡总监，负责手冲出品与新人培训。',
    spec: ['手冲萃取', '拉花艺术', 'SCA 高级']
  },
  {
    id: 'wang',
    name: '王沐',
    role: '甜点主厨 / Pastry Chef',
    initials: '王',
    joined: '2020',
    from: '法国·里昂',
    quote: '一杯好咖啡，需要一份好甜点来配。',
    bio: '里昂保罗·博古斯学院毕业，五年法式甜点经验。负责拾光下午茶套餐与季节甜点开发。',
    spec: ['法式甜点', '面包烘焙', '糖艺']
  },
  {
    id: 'chen',
    name: '陈芷',
    role: '调饮师 / Mixologist',
    initials: '陈',
    joined: '2022',
    from: '上海',
    quote: '茶与咖啡的边界，正在被一杯杯创意饮品打破。',
    bio: '上海调饮师大赛 2021 季军。负责拾光特色饮品研发，将中国茶、节气食材与意式咖啡融合。',
    spec: ['创意特调', '节气食材', '分子料理']
  }
]

// ============================================
// 随笔 (Blog posts)
// ============================================
export const blogPosts = [
  {
    id: 'slow-time',
    title: '慢时间与一杯咖啡',
    subtitle: '我们为什么坚持用手冲',
    date: '2026-05-20',
    author: '苏先生',
    category: '主理人手记',
    cover: '/coffee-shop/menu-osmanthus-latte.jpg',
    excerpt: '一台手冲壶，需要九十秒的专注。在这段时间里，咖啡师无法做其他事。',
    readTime: '5 min',
    body: [
      '在拾光，每一杯手冲都需要九十秒。这九十秒里，咖啡师只能专注于水流、温度、时间——任何分心都会让萃取偏移。',
      '我们相信，这种「被迫慢下来」的状态，本身就是咖啡文化的一部分。当你看着咖啡师一圈一圈注水，看着咖啡液一缕一缕落下，那九十秒里，咖啡师和你，都被强制拉进了咖啡的时间刻度。',
      '连锁咖啡的卖点是「快」，精品咖啡的卖点是「慢」。我们选择后者。',
      '七年来，我们没有为了效率而引入任何「标准化冲煮设备」——没有自动手冲机，没有胶囊机，没有一键式美式。我们坚持用 V60 滤杯 + 手冲壶，因为手工冲煮的变量是「人」，而不是「机器」。',
      '如果你愿意在拾光点一杯手冲，请给自己九十秒的时间。放下手机，看着水流，等它完成。这九十秒，是你送给自己的一小段慢时间。'
    ]
  },
  {
    id: 'seasonal',
    title: '季节限定：桂花与咖啡的对话',
    subtitle: '一杯拿铁里的秋日',
    date: '2026-04-12',
    author: '陈芷',
    category: '调饮笔记',
    cover: '/coffee-shop/menu-osmanthus-latte.jpg',
    excerpt: '桂花拿铁是拾光每年秋天的招牌。从九月初桂花初放到十一月底风干，每年仅 90 天供应。',
    readTime: '4 min',
    body: [
      '每年九月初，云南与广西的桂花陆续开放。我们会在这段时间内与产地直接联系，预订「当日采摘·冷链运输」的新鲜桂花。',
      '制作一杯桂花拿铁，需要三步：先用冷萃咖啡液与桂花糖浆做基底（24 小时低温萃取，让桂花香气充分释放）；然后注入热牛奶（燕麦奶最佳）；最后铺上打发奶泡，撒上几粒当日采摘的鲜桂花。',
      '关键在于「当日采摘」——干桂花的香气会在三个月内损失 70%，只有鲜花能呈现那种带有「露水感」的鲜活香。',
      '我们每年只在 9 月 1 日到 11 月 30 日之间供应这杯拿铁。一年 90 天，错过就要等下一年。',
      '如果你在秋天路过拾光，强烈建议尝试。这是属于秋天的味道。'
    ]
  },
  {
    id: 'space',
    title: '三里屯的空间叙事',
    subtitle: '关于「窗边」的那张桌子',
    date: '2026-03-08',
    author: '李青',
    category: '空间笔记',
    cover: '/coffee-shop/hero.jpg',
    excerpt: '「窗边」是拾光最受欢迎的位置。我们专门为它留出最充足的午后阳光。',
    readTime: '6 min',
    body: [
      '拾光三里屯店的「窗边」那张桌子，是从开业第一天就被预订最多的位置。',
      '它位于二楼南向的转角，下午两点到四点之间，阳光会以大约 35° 角斜斜地照进来。这个角度刚好让光线落在桌面上，而不会直射眼睛。',
      '我们花了三个月才找到这个角度。装修期间，我们用激光笔模拟过 24 个不同方向的午后阳光，最终选定了这个转角。',
      '这张桌子只设两个座位。我们不卖「加位」。有些客人会为了等这张桌子等 40 分钟。我们也会提前告诉客人：「今天窗边满了，要不要换一张？」',
      '咖啡是体验，空间也是。我们希望「窗边」能成为一些人在三里屯的固定记忆——比如「我和我先生每周三下午都在那里」。',
      '这是一家咖啡馆能给出的最好承诺。'
    ]
  },
  {
    id: 'beans',
    title: '我们的豆子：来自云南',
    subtitle: '中国精品咖啡的 12 年',
    date: '2026-02-14',
    author: '苏先生',
    category: '产地笔记',
    cover: '/coffee-shop/menu-latte.jpg',
    excerpt: '云南小粒种不再是「平价商业豆」的代名词。2014 年起，云南精品豆逐渐在国际杯测中崭露头角。',
    readTime: '7 min',
    body: [
      '2014 年，云南普洱的「瑰夏」在国际咖啡杯测中拿到 88 分。这是中国咖啡豆首次在国际精品咖啡评分体系内进入「精品」区间（80 分以上）。',
      '这之前，云南豆长期被归为「商业豆」——用于速溶、罐装、拼配底，价格低，品质中等。',
      '但云南的地理条件其实非常适合精品咖啡：高海拔（1500-2000m）、充足的雨水、巨大的昼夜温差、火山土壤。这些条件不输埃塞俄比亚或哥伦比亚的精品产区。',
      '过去十二年，我们与云南普洱三家咖啡庄园建立了长期采购关系。我们承诺以「杯测分数+5% 溢价」收购他们的精品批次——这一价格高于市场价 30%。',
      '这笔溢价不是为了「公益」，而是因为我们真正需要好的豆子。好的豆子不便宜，也不应该便宜。',
      '如果你下次来拾光，尝试我们的「云南·普洱·水洗」手冲。这杯豆子来自我们合作八年的一个家族庄园。'
    ]
  }
]
