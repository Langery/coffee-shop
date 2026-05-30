from PIL import Image, ImageDraw, ImageFilter, ImageFont
import os

output_dir = '/Users/langery/Desktop/coffee-shop/public/images'
os.makedirs(output_dir, exist_ok=True)

def create_hero():
    img = Image.new('RGB', (1600, 900), '#8B7355')
    draw = ImageDraw.Draw(img)
    # Add some visual interest with gradient-like effect
    for i in range(900):
        alpha = int(30 * (1 - i / 900))
        color = (139 - alpha, 115 - alpha, 85 - alpha)
        draw.line([(0, i), (1600, i)], fill=color)
    # Add text
    draw.text((800, 400), "拾光咖啡", fill='#FFFFFF', anchor='mm')
    img.save(f'{output_dir}/hero.jpg', 'JPEG', quality=85)

def create_product(name, bg_color, text):
    img = Image.new('RGB', (400, 300), bg_color)
    draw = ImageDraw.Draw(img)
    draw.text((200, 150), text, fill='#FFFFFF', anchor='mm')
    img.save(f'{output_dir}/{name}', 'JPEG', quality=85)

create_hero()
create_product('latte.jpg', '#D4A574', '拿铁')
create_product('cappuccino.jpg', '#8B6914', '卡布奇诺')
create_product('mocha.jpg', '#5D3A1A', '摩卡')
create_product('espresso.jpg', '#2C1810', '浓缩')
create_product('americano.jpg', '#6B4423', '美式')

print('Images generated successfully!')