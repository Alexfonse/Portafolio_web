#!/usr/bin/env python3
"""Insert arcane loader HTML into index.html"""

html_file = r"C:\Users\marti\OneDrive\Documents\Paradox\Portafolio_web\index.html"

loader_html = """
    <!-- ⚡ ARCANE PAGE LOADER -->
    <div class="arcane-loader">
        <div class="rune-circle">
            <svg viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" />
            </svg>
            <div class="inner-glow"></div>
        </div>
        <div class="loading-text">INVOCANDO...</div>
        <div class="progress-rune"></div>
        
        <!-- Floating Runes -->
        <div class="floating-rune">⟐</div>
        <div class="floating-rune">◉</div>
        <div class="floating-rune">⬢</div>
        <div class="floating-rune">◈</div>
    </div>

"""

# Read file
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Insert loader after <body>
if '<div class="arcane-loader">' not in content:
    content = content.replace('<body>\r\n\r\n    <!-- Menú', f'<body>\n{loader_html}    <!-- Menú')
    
    # Write back
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Arcane loader inserted successfully!")
else:
    print("⚠️ Loader already exists")
