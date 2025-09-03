import os

# Define the full folder + file structure
structure = {
    "netcode-atlas": {
        "public": {
            "images": ["hero.webp", "dns-diagram.svg", "tcp-udp.svg", "html-logo.svg", "css-logo.svg", "js-logo.svg", "python-logo.svg"],
            "icons": ["favicon.ico", "icon-192.png", "icon-512.png"],
            "data": ["dns-latency.json", "protocols-adoption.json", "html-tags.csv", "tld-share.json"],
            "files": ["manifest.json"]
        },
        "src": {
            "css": ["global.css", "navbar.css", "footer.css", "pages.css"],
            "js": ["main.js", "charts.js", "auth.js", "eastereggs.js"],
            "components": ["navbar.html", "footer.html"],
            "pages": [
                "index.html", "about.html", "dns.html", "internet.html", "html.html", "css.html", "js.html", "python.html",
                "charts.html", "connectivity.html", "faq.html", "resources.html", "login.html", "signup.html", "contact.html"
            ]
        },
        "api": ["main.py"],
        "files": ["vercel.json", "package.json", "requirements.txt", "README.md", ".gitignore"]
    }
}


def create_structure(base, struct):
    os.makedirs(base, exist_ok=True)
    
    # Handle folders + files inside each level
    for key, value in struct.items():
        if key == "files":
            for file in value:
                file_path = os.path.join(base, file)
                if not os.path.exists(file_path):
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(f"<!-- {file} placeholder -->\n" if file.endswith(".html") else "")
        elif isinstance(value, dict):
            folder_path = os.path.join(base, key)
            os.makedirs(folder_path, exist_ok=True)
            create_structure(folder_path, value)
        elif isinstance(value, list):
            folder_path = os.path.join(base, key)
            os.makedirs(folder_path, exist_ok=True)
            for file in value:
                file_path = os.path.join(folder_path, file)
                if not os.path.exists(file_path):
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(f"<!-- {file} placeholder -->\n" if file.endswith(".html") else "")


if __name__ == "__main__":
    create_structure(".", structure)
    print("✅ NetCode Atlas project structure created!")
