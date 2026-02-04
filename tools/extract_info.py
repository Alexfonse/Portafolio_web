import sys
import re

# Leer el archivo con encoding correcto
with open(r'contexto_y_tareas\organizar_nuevo\informacion nueva.txt', 'r', encoding='utf-16-le') as f:
    content = f.read()

# Extraer secciones clave
sections = {}
section_markers = [
    ('SECCIÓN 1: SOBRE TI', 'SECCIÓN 2:'),
    ('SECCIÓN 2: PROYECTOS', 'SECCIÓN 3:'),
    ('SECCIÓN 3: "POR QUÉ YO"', 'SECCIÓN 4:'),
    ('SECCIÓN 4: CONTENIDO MULTIMEDIA', 'SECCIÓN 5:'),
    ('SECCIÓN 5: INFORMACIÓN DE CONTACTO', 'SECCIÓN 6:'),
    ('SECCIÓN 6: PREFERENCIAS DE DISEÑO', 'RESUMEN'),
]

for section_name, next_section in section_markers:
    start_idx = content.find(section_name)
    end_idx = content.find(next_section, start_idx)
    if start_idx != -1:
        section_text = content[start_idx: end_idx if end_idx != -1 else len(content)]
        sections[section_name] = section_text[:2000]  # Primeros 2000 chars de cada sección

# Guardar resumen extraído
with open(r'contexto_y_tareas\organizar_nuevo\extracted_summary.txt', 'w', encoding='utf-8') as f:
    for section_name, section_text in sections.items():
        f.write(f"\n\n{'='*60}\n")
        f.write(f"{section_name}\n")
        f.write(f"{'=*60}\n\n")
        f.write(section_text)

print("Extracción completada. Archivo creado: extracted_summary.txt")
print(f"Secciones encontradas: {len(sections)}")
