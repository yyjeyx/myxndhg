#!/usr/bin/env python3
"""
创建图片占位符，用于2025·可爱定格网站
"""

import os

def create_placeholder_html():
    """创建HTML文件，用于生成图片占位符"""
    placeholder_html = '''
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>图片占位符生成器</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #FFF9FB;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            color: #FFB6C1;
            text-align: center;
        }
        .placeholder-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        .placeholder-item {
            text-align: center;
        }
        .placeholder-image {
            width: 100%;
            aspect-ratio: 4/3;
            background-color: #FFE6F2;
            border: 2px dashed #FFB6C1;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #5D4A46;
            font-size: 18px;
            font-weight: bold;
            border-radius: 10px;
        }
        .placeholder-text {
            margin-top: 10px;
            color: #5D4A46;
            font-size: 14px;
        }
        .instructions {
            background-color: #FFE6F2;
            padding: 20px;
            border-radius: 10px;
            margin-top: 30px;
        }
        .instructions h2 {
            color: #FFB6C1;
            margin-top: 0;
        }
        .instructions ol {
            color: #5D4A46;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>2025·可爱定格 - 图片占位符</h1>
        
        <div class="placeholder-grid">
            <!-- 生成10个图片占位符 -->
            {placeholders}
        </div>
        
        <div class="instructions">
            <h2>使用说明</h2>
            <ol>
                <li>将您的10张回忆照片重命名为：photo_01.jpg, photo_02.jpg, ..., photo_10.jpg</li>
                <li>将重命名后的照片放入 <code>assets/photos/</code> 目录</li>
                <li>刷新网站页面，即可看到您的照片替换掉这些占位符</li>
            </ol>
        </div>
    </div>
</body>
</html>
    '''
    
    # 生成10个图片占位符
    placeholders = ''
    for i in range(1, 11):
        placeholders += f'''        <div class="placeholder-item">
            <div class="placeholder-image">照片 {i}</div>
            <div class="placeholder-text">photo_{i:02d}.jpg</div>
        </div>
'''
    
    # 写入HTML文件
    with open('photo_placeholders.html', 'w', encoding='utf-8') as f:
        f.write(placeholder_html.format(placeholders=placeholders))
    
    print("✓ 已创建图片占位符HTML文件: photo_placeholders.html")

def update_index_html():
    """更新index.html，添加图片占位符支持"""
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 修改图片路径，使用data URL作为临时占位符
        for i in range(1, 11):
            # 创建简单的粉色背景占位符
            placeholder = f"data:image/svg+xml,%%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%%3E%%3Crect width='400' height='300' fill='%%23FFE6F2'/%%3E%%3Ctext x='200' y='150' font-family='Arial' font-size='24' fill='%%23FFB6C1' text-anchor='middle' dominant-baseline='middle'%%3E照片 {i}%%3C/text%%3E%%3C/svg%%3E"
            old_path = f"./assets/photos/photo_{i:02d}.jpg"
            content = content.replace(old_path, placeholder)
        
        # 写入更新后的文件
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(content)
        
        print("✓ 已更新index.html，添加了图片占位符")
    except FileNotFoundError:
        print("✗ 未找到index.html文件")
    except Exception as e:
        print(f"✗ 更新index.html时出错: {e}")

if __name__ == "__main__":
    print("开始创建图片占位符...")
    create_placeholder_html()
    update_index_html()
    print("\n✓ 图片占位符创建完成！")
    print("\n您现在可以通过以下链接访问网站：")
    print("   http://localhost:8000/2025_cute_memory/")
    print("\n查看图片占位符说明：")
    print("   http://localhost:8000/2025_cute_memory/photo_placeholders.html")
