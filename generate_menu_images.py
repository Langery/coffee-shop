from PIL import Image, ImageDraw, ImageFont
import os

output_dir = '/Users/langery/Desktop/coffee-shop/public'
os.makedirs(output_dir, exist_ok=True)

def create_image(text, bg_color, text_color, filename):
    """Create a simple branded image with text"""
    img = Image.new('RGB', (400, 300), bg_color)
    draw = ImageDraw.Draw(img)
    # Add a simple decorative element - a lighter strip at top
    draw.rectangle([0, 0, 400, 8], fill='#FFFFFF')
    draw.rectangle([0, 292, 400, 300], fill='#FFFFFF')
    # Add text
    draw.text((200, 150), text, fill=text_color, anchor='mm')
    img.save(f'{output_dir}/{filename}', 'JPEG', quality=85)

# 咖啡类 - 深棕色系，代表咖啡的浓郁
coffee_colors = {
    'espresso': ('#2C1810', '#D4A574'),      # 深咖啡色
    'americano': ('#4A3728', '#E8D4C4'),     # 浅咖啡色
    'latte': ('#8B6914', '#FFFFFF'),          # 拿铁黄
    'cappuccino': ('#6B4423', '#FFFFFF'),     # 卡布奇诺棕
    'mocha': ('#3D2B1F', '#D4A574'),          # 摩卡深棕
    'flat-white': ('#5C4033', '#FFFFFF'),     # 馥芮白
}

for name, (bg, text) in coffee_colors.items():
    create_image(name.upper(), bg, text, f'menu-{name}.jpg')

# 特色饮品 - 温暖清新色系
special_colors = {
    'osmanthus-latte': ('#DAA520', '#3D2B1F'),  # 桂花金
    'grapefruit-cold': ('#FF6347', '#FFFFFF'),  # 西柚红
    'matcha-red-bean': ('#228B22', '#FFFFFF'),  # 抹茶绿
}

for name, (bg, text) in special_colors.items():
    create_image(name.split('-')[0].upper(), bg, text, f'menu-{name}.jpg')

# 茶饮类 - 清新自然色系
tea_colors = {
    'matcha-latte': ('#90EE90', '#2D5016'),    # 抹茶绿
    'hong-bao-tea': ('#8B0000', '#FFD700'),    # 红宝茶深红
    'jasmine-tea': ('#FFFACD', '#5C8A2D'),     # 茉莉花茶淡黄
}

for name, (bg, text) in tea_colors.items():
    create_image(name.split('-')[0].upper()[:8], bg, text, f'menu-{name}.jpg')

# 甜点类 - 温暖甜蜜色系
dessert_colors = {
    'scone': ('#DEB887', '#5C4033'),           # 司康米棕
    'macaron': ('#FFB6C1', '#8B4557'),          # 马卡龙粉
    'fruit-tart': ('#FFDAB9', '#8B4513'),      # 水果塔桃色
}

for name, (bg, text) in dessert_colors.items():
    create_image(name.split('-')[0].upper()[:6], bg, text, f'menu-{name}.jpg')

# 套餐类 - 典雅深色系
set_colors = {
    'afternoon-tea': ('#8B4513', '#FFFFFF'),   # 下午茶棕色
    'coffee-set': ('#3D2B1F', '#D4A574'),       # 手冲套餐深棕
}

for name, (bg, text) in set_colors.items():
    create_image(name.split('-')[0].upper() + ' SET', bg, text, f'menu-{name}.jpg')

print('Menu images regenerated successfully!')