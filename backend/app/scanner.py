import requests
from bs4 import BeautifulSoup
import logging


# Configure logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def fetch_site_data(url: str) -> dict:
    """
    Fetches the URL and extracts raw signals for analysis.
    Uses proper headers to avoid being blocked.
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
    }
    logger.info(f"Scanning URL: {url}")

    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        html_content = response.text
    except requests.exceptions.Timeout:
        raise ValueError("The website took too long to respond.")
    except requests.exceptions.RequestException as e:
        raise ValueError(f"Failed to access the website: {str(e)}")

    soup = BeautifulSoup(html_content, "html.parser")

    # 1. Metadata
    title = soup.title.string.strip() if soup.title and soup.title.string else ""
    meta_desc = soup.find("meta", attrs={"name": "description"})
    description_length = len(meta_desc["content"]) if meta_desc and meta_desc.get("content") else 0
    
    # 2. Structure
    headings = [h.name for h in soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6"])]
    paragraphs = [p.get_text(strip=True) for p in soup.find_all("p") if len(p.get_text(strip=True)) > 20]
    
    # 3. Media & Links
    images = soup.find_all("img")
    images_without_alt = sum(1 for img in images if not img.get("alt"))
    links = [a.get("href") for a in soup.find_all("a", href=True)]
    
    # 4. Tech/Modernity & Framework Detection
    meta_viewport = soup.find("meta", attrs={"name": "viewport"})
    deprecated_tags = ["font", "center", "marquee", "frame", "frameset", "blink"]
    deprecated_count = sum(len(soup.find_all(tag)) for tag in deprecated_tags)

    # Framework Signals
    html_text = html_content.lower()
    has_react = "react" in html_text or 'id="root"' in html_text or 'id="__next"' in html_text
    has_vite = "vite" in html_text or 'type="module"' in html_text
    has_tailwind = "bg-" in html_text and "text-" in html_text and "flex" in html_text # Heuristic for utility classes
    has_bootstrap = "bootstrap" in html_text or "class=\"btn" in html_text

    is_spa = has_react or (soup.body and not soup.body.get_text(strip=True) and (has_vite or has_react))

    tech_stack = []
    if has_react: tech_stack.append("React/JS Framework")
    # 5. Visual / Design Signals
    # -----------------------------
    # Fonts
    custom_fonts = False
    for link in soup.find_all("link", href=True):
        href = link["href"].lower()
        if "fonts.googleapis.com" in href or "typekit" in href or "fonts.cdnfonts.com" in href:
            custom_fonts = True
            break
            
    # CTAs / Buttons
    # profound search for "btn", "button", "cta" in class OR role="button"
    buttons = soup.find_all(lambda tag: (tag.name == "button") or 
                                       (tag.has_attr("class") and any("btn" in c or "button" in c or "cta" in c for c in tag["class"])) or
                                       (tag.has_attr("role") and tag["role"] == "button"))
    button_count = len(buttons)

    logger.info(
        f"Scan summary | headings={len(headings)} "
        f"paragraphs={len(paragraphs)} "
        f"images={len(images)} "
        f"custom_fonts={custom_fonts} "
        f"buttons={button_count} "
        f"deprecated_tags={deprecated_count} "
        f"tech_stack={tech_stack}"
    )


    return {
        "title": title,
        "description_length": description_length,
        "heading_structure": headings,
        "paragraph_count": len(paragraphs),
        "total_images": len(images),
        "images_without_alt": images_without_alt,
        "link_count": len(links),
        "has_viewport": bool(meta_viewport),
        "deprecated_tag_count": deprecated_count,
        "html_size_bytes": len(html_content),
        "tech_stack": tech_stack,
        "is_spa": is_spa,
        "custom_fonts": custom_fonts,
        "button_count": button_count
    }
