import re

filepath_page = r"d:\Projetos\portfolio2026\Portfolio 2026\neon-portfolio\src\app\painel\page.tsx"

with open(filepath_page, 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace("newProject.image_url", "newProject.image")

with open(filepath_page, 'w', encoding='utf-8') as f:
    f.write(code)

print("Fixed property names.")
