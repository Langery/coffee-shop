from PIL import Image, ImageDraw, ImageFont
import os

output_dir = '/Users/langery/Desktop/coffee-shop/public'
os.makedirs(output_dir, exist_ok=True)

def create_cup_image(bg_color, cup_color, label, filename):
    """Create an image with a simple cup shape"""
    img = Image.new('RGB', (400, 300), bg_color)
    draw = ImageDraw.Draw(img)

    # Draw a simple cup shape (trapezoid with handle)
    # Cup body
    cup_left, cup_right = 140, 260
    cup_top, cup_bottom = 80, 220
    draw.polygon([
        (cup_left, cup_top),
        (cup_right, cup_top),
        (cup_right + 20, cup_bottom),
        (cup_left - 20, cup_bottom)
    ], fill=cup_color)

    # Cup handle
    draw.arc((cup_right + 10, cup_top + 30, cup_right + 60, cup_top + 90), 270, 90, fill=cup_color, width=12)

    # Steam lines (for hot drinks)
    draw.arc((170, 40, 200, 70), 0, 180, fill='#FFFFFF', width=3)
    draw.arc((200, 35, 230, 65), 0, 180, fill='#FFFFFF', width=3)

    # Label
    draw.text((200, 260), label, fill='#FFFFFF', anchor='mm')
    img.save(f'{output_dir}/{filename}', 'JPEG', quality=85)

def create_dessert_image(bg_color, dessert_color, label, filename):
    """Create an image with a simple dessert shape (plate with item)"""
    img = Image.new('RGB', (400, 300), bg_color)
    draw = ImageDraw.Draw(img)

    # Plate (ellipse)
    draw.ellipse([100, 180, 300, 240], fill='#FFFFFF')

    # Dessert on plate (circle/dome shape)
    draw.ellipse([130, 130, 270, 190], fill=dessert_color)
    draw.ellipse([150, 110, 250, 150], fill=dessert_color)

    # Label
    draw.text((200, 260), label, fill='#FFFFFF', anchor='mm')
    img.save(f'{output_dir}/{filename}', 'JPEG', quality=85)

def create_tea_pot_image(bg_color, pot_color, label, filename):
    """Create an image with a simple tea pot shape"""
    img = Image.new('RGB', (400, 300), bg_color)
    draw = ImageDraw.Draw(img)

    # Tea pot body (circle)
    draw.ellipse([150, 100, 250, 200], fill=pot_color)

    # Lid
    draw.ellipse([165, 85, 235, 105], fill=pot_color)
    draw.ellipse([185, 70, 215, 90], fill=pot_color)

    # Spout
    draw.polygon([(250, 130), (320, 110), (320, 140), (250, 150)], fill=pot_color)

    # Handle
    draw.polygon([(150, 130), (100, 110), (100, 170), (150, 160)], fill=pot_color)

    # Label
    draw.text((200, 260), label, fill='#FFFFFF', anchor='mm')
    img.save(f'{output_dir}/{filename}', 'JPEG', quality=85)

def create_set_image(bg_color, main_color, label, filename):
    """Create an image representing a set/meal"""
    img = Image.new('RGB', (400, 300), bg_color)
    draw = ImageDraw.Draw(img)

    # Draw three stacked plates
    draw.ellipse([80, 160, 180, 200], fill='#FFFFFF')
    draw.ellipse([120, 140, 220, 180], fill='#FFFFFF')
    draw.ellipse([160, 120, 260, 160], fill='#FFFFFF')

    # Draw cup on top
    draw.polygon([(280, 100), (340, 100), (350, 180), (270, 180)], fill=main_color)
    draw.arc((340, 110, 375, 145), 270, 90, fill=main_color, width=8)

    # Label
    draw.text((200, 260), label, fill='#FFFFFF', anchor='mm')
    img.save(f'{output_dir}/{filename}', 'JPEG', quality=85)

def create_cold_drink_image(bg_color, cup_color, label, filename):
    """Create an image with a cold cup shape (tall with straw)"""
    img = Image.new('RGB', (400, 300), bg_color)
    draw = ImageDraw.Draw(img)

    # Tall cup body
    draw.polygon([(140, 60), (180, 60), (190, 230), (130, 230)], fill=cup_color)

    # Straw
    draw.rectangle([200, 20, 210, 180], fill='#FFFFFF')

    # Ice cubes indication (simple lines)
    draw.line([(145, 100), (175, 100)], fill='#FFFFFF', width=2)
    draw.line([(145, 140), (175, 140)], fill='#FFFFFF', width=2)
    draw.line([(145, 180), (175, 180)], fill='#FFFFFF', width=2)

    # Label
    draw.text((200, 260), label, fill='#FFFFFF', anchor='mm')
    img.save(f'{output_dir}/{filename}', 'JPEG', quality=85)

# 咖啡类
create_cup_image('#5D3A1A', '#3D2B1F', 'ESPRESSO', 'menu-espresso.jpg')
create_cup_image('#6B4423', '#4A3728', 'AMERICANO', 'menu-americano.jpg')
create_cup_image('#D4A574', '#F5E6D3', 'LATTE', 'menu-latte.jpg')
create_cup_image('#8B6914', '#C4A35A', 'CAPPUCCINO', 'menu-cappuccino.jpg')
create_cup_image('#3D2B1F', '#5C4033', 'MOCHA', 'menu-mocha.jpg')
create_cup_image('#8B7355', '#A08060', 'FLAT WHITE', 'menu-flat-white.jpg')

# 特色饮品
create_cup_image('#DAA520', '#F0C040', '桂花拿铁', 'menu-osmanthus-latte.jpg')
create_cold_drink_image('#FF6347', '#FF8C69', '柚子冷萃', 'menu-grapefruit-cold.jpg')
create_cold_drink_image('#228B22', '#3CB371', '抹茶红豆', 'menu-matcha-red-bean.jpg')

# 茶饮类
create_tea_pot_image('#90EE90', '#228B22', '抹茶拿铁', 'menu-matcha-latte.jpg')
create_tea_pot_image('#DC143C', '#8B0000', '红宝奶茶', 'menu-hong-bao-tea.jpg')
create_tea_pot_image('#FFFACD', '#F0E68C', '茉莉花茶', 'menu-jasmine-tea.jpg')

# 甜点类
create_dessert_image('#DEB887', '#D2691E', '英式司康', 'menu-scone.jpg')
create_dessert_image('#FFB6C1', '#FF69B4', '法式马卡龙', 'menu-macaron.jpg')
create_dessert_image('#FFDAB9', '#FFA07A', '季节水果塔', 'menu-fruit-tart.jpg')

# 套餐类
create_set_image('#8B4513', '#D2691E', '下午茶套餐', 'menu-afternoon-tea.jpg')
create_set_image('#3D2B1F', '#8B6914', '手冲咖啡套餐', 'menu-coffee-set.jpg')

print('Menu images with visual shapes generated successfully!')