"""
Static Site Builder — Idiomas Sousa
Compiles modular templates from templates/ into production-ready HTML pages.

Usage:
    python build.py          # Compiles all pages
    python build.py --serve  # Compiles and starts a local preview server (port 8000)
"""

import os
import sys
import time

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")
COMPONENTS_DIR = os.path.join(TEMPLATES_DIR, "components")
LAYOUTS_DIR = os.path.join(TEMPLATES_DIR, "layouts")
PAGES_DIR = os.path.join(TEMPLATES_DIR, "pages")

PAGES_CONFIG = [
    {
        "output": "index.html",
        "template": "index.html",
        "title": "Escola de Idiomas em Sousa-PB | Inglês, Espanhol, Francês, Italiano e Libras",
        "description": "Cursos de Inglês, Espanhol, Francês, Italiano e Libras para crianças, jovens e adultos em Sousa-PB. Aulas individuais e em grupo a partir de R$ 150/mês. Fale conosco no WhatsApp.",
        "nav_key": "NAV_INICIO"
    },
    {
        "output": "cursos.html",
        "template": "cursos.html",
        "title": "Cursos de Idiomas | Inglês, Espanhol, Francês, Italiano e Libras em Sousa-PB",
        "description": "Conheça nossos cursos de Inglês, Espanhol, Francês, Italiano e Libras para crianças, jovens e adultos em Sousa-PB. Aulas em turmas dinâmicas ou individuais VIP.",
        "nav_key": "NAV_CURSOS"
    },
    {
        "output": "escola.html",
        "template": "escola.html",
        "title": "A Escola | Idiomas Sousa - PB",
        "description": "Conheça a estrutura, ambiente e proposta da nossa escola de idiomas em Sousa-PB. Espaço preparado para o aprendizado prático de línguas estrangeiras e Libras.",
        "nav_key": "NAV_ESCOLA"
    },
    {
        "output": "precos-horarios.html",
        "template": "precos-horarios.html",
        "title": "Preços e Horários | Idiomas Sousa - PB",
        "description": "Confira os valores e horários dos cursos de Inglês, Espanhol, Francês, Italiano e Libras em Sousa-PB. Mensalidades a partir de R$ 150,00 e funcionamento de segunda a sábado.",
        "nav_key": "NAV_PRECOS"
    },
    {
        "output": "contato.html",
        "template": "contato.html",
        "title": "Contato e Atendimento | Idiomas Sousa - PB",
        "description": "Entre em contato com nossa escola de idiomas em Sousa-PB. Cursos de Inglês, Espanhol, Francês, Italiano e Libras. WhatsApp (83) 99999-9999 e localização central.",
        "nav_key": "NAV_CONTATO"
    }
]

def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def build():
    start_time = time.time()
    print("=" * 60)
    print("  IDIOMAS SOUSA — Static Site Builder")
    print("=" * 60)
    print("Compilando templates modulares...")

    base_layout = read_file(os.path.join(LAYOUTS_DIR, "base.html"))
    header_template = read_file(os.path.join(COMPONENTS_DIR, "header.html"))
    footer = read_file(os.path.join(COMPONENTS_DIR, "footer.html"))
    promo_ribbon = read_file(os.path.join(COMPONENTS_DIR, "promo-ribbon.html"))
    floating_whatsapp = read_file(os.path.join(COMPONENTS_DIR, "floating-whatsapp.html"))

    nav_keys = ["NAV_INICIO", "NAV_CURSOS", "NAV_ESCOLA", "NAV_PRECOS", "NAV_CONTATO"]

    built_count = 0
    for page in PAGES_CONFIG:
        page_content_path = os.path.join(PAGES_DIR, page["template"])
        if not os.path.exists(page_content_path):
            print(f"  [AVISO] {page_content_path} não encontrado. Pulando...")
            continue

        page_content = read_file(page_content_path)

        # Monta header com classe active para a página atual
        page_header = header_template
        for k in nav_keys:
            if k == page["nav_key"]:
                page_header = page_header.replace(f"{{{{{k}}}}}", "active")
            else:
                page_header = page_header.replace(f"{{{{{k}}}}}", "")

        # Injeta componentes no layout base
        output_html = base_layout
        output_html = output_html.replace("{{PAGE_TITLE}}", page["title"])
        output_html = output_html.replace("{{PAGE_DESCRIPTION}}", page["description"])
        output_html = output_html.replace("{{PROMO_RIBBON}}", promo_ribbon)
        output_html = output_html.replace("{{HEADER}}", page_header)
        output_html = output_html.replace("{{PAGE_CONTENT}}", page_content)
        output_html = output_html.replace("{{FLOATING_WHATSAPP}}", floating_whatsapp)
        output_html = output_html.replace("{{FOOTER}}", footer)

        output_path = os.path.join(BASE_DIR, page["output"])
        write_file(output_path, output_html)
        print(f"  ✓ {page['output']} gerado com sucesso")
        built_count += 1

    elapsed = (time.time() - start_time) * 1000
    print("-" * 60)
    print(f"Sucesso: {built_count} páginas compiladas em {elapsed:.1f}ms")
    print("=" * 60)

def serve(port=8000):
    import http.server
    import socketserver
    
    os.chdir(BASE_DIR)
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", port), handler) as httpd:
        print(f"\n[DEV SERVER] Servindo em http://localhost:{port}/")
        print("Pressione Ctrl+C para encerrar.\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor encerrado.")

if __name__ == "__main__":
    build()
    if "--serve" in sys.argv:
        port = 8000
        for arg in sys.argv:
            if arg.startswith("--port="):
                port = int(arg.split("=")[1])
        serve(port)

