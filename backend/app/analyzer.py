# analyzer.py

def calculate_score(data: dict, persona: str = "recruiter") -> dict:
    """
    Analyzes the raw site data and generates a score (0-100).
    Adjusts weights and insights based on the selected Persona.
    """
    score = 0
    insights = []
    suggestions = []

    is_spa = data.get("is_spa", False)
    tech_stack = data.get("tech_stack", [])
    
    # --- WEIGHTS (Refined for fairness) ---
    weights = {
        "tech": 10,
        "seo": 15,
        "mobile": 15,
        "structure": 15,    # Reduced from 20
        "content": 15,
        "visual": 20,       # NEW: Visual Design Score
        "a11y": 10,
        "bloat_penalty": 20
    }

    if persona == "design_lead":
        weights.update({"visual": 30, "structure": 20, "tech": 5}) # Design is king
    elif persona == "client":
        weights.update({"content": 25, "visual": 15, "seo": 20}) # Trust is king

    # -----------------------------
    # 1. Modern Tech Stack
    # -----------------------------
    stack_score = 0
    if tech_stack:
        stack_score = min(weights["tech"], len(tech_stack) * 5)
        if persona != "client":
             insights.append(f"Modern tech stack detected: {', '.join(tech_stack)}.")
    
    if is_spa:
        stack_score += (5 if persona != "client" else 0)
        if persona == "recruiter":
            insights.append("SPA architecture detected (Good for UX).")

    score += min(stack_score, weights["tech"])

    # -----------------------------
    # 2. visual Design (NEW)
    # -----------------------------
    visual_score = 0
    if data.get("custom_fonts"):
        visual_score += weights["visual"] * 0.5
        insights.append("Typography detected (Custom Fonts).")
    
    if data.get("button_count", 0) > 0:
        visual_score += weights["visual"] * 0.5
        insights.append(f"Clear Actions detected ({data.get('button_count')} buttons).")
    else:
        # No buttons penalties ONLY if not minimal
        if persona != "design_lead":
             suggestions.append("Add clear Call-to-Action (CTA) buttons.")

    score += visual_score

    # -----------------------------
    # 3. Identity & SEO
    # -----------------------------
    seo_score = 0
    if data["title"] and len(data["title"]) > 8:
        seo_score += (weights["seo"] * 0.5)
    else:
        suggestions.append("Add a descriptive page title.")
    
    if data["description_length"] >= 50:
        seo_score += (weights["seo"] * 0.5)
        if persona == "recruiter":
            insights.append("Meta description helps me find you on Google.")
    else:
        suggestions.append("Improve meta description for SEO.")
    
    score += seo_score
    
    
    # -----------------------------
    # 4. Content Structure (RELAXED)
    # -----------------------------
    struct_score = 0
    heading_count = len(data["heading_structure"])

    if heading_count >= 1: # Was 3!
        struct_score = weights["structure"]
        if heading_count >= 3:
             insights.append("Excellent hierarchical structure.")
        else:
             insights.append("Clear page title/heading structure.")
    else:
        score -= 5 # Reduced penalty
        suggestions.append("No main heading (H1) found.")
    
    score += struct_score

    # -----------------------------
    # 5. Content Depth (RELAXED)
    # -----------------------------
    content_score = 0
    p_count = data["paragraph_count"]
    
    if p_count >= 2: # Was 5!
        content_score = weights["content"]
        insights.append("Concise and clear content.")
    elif p_count >= 1:
        content_score = weights["content"] * 0.7
    else:
        score -= 5
        suggestions.append("Add a bit more context about yourself.")

    score += content_score

    # -----------------------------
    # 6. Accessibility
    # -----------------------------
    a11y_score = 0
    total_imgs = data["total_images"]
    missing_alt = data["images_without_alt"]

    if total_imgs > 0:
        alt_ratio = (total_imgs - missing_alt) / total_imgs
        if alt_ratio >= 0.9:
            a11y_score = weights["a11y"]
            insights.append("Images have proper alt text.")
        elif alt_ratio >= 0.5:
            a11y_score = weights["a11y"] * 0.5
            suggestions.append("Some images missing alt text.")
        else:
            score -= 10
            suggestions.append("Most images lack alt text.")
    else:
        a11y_score = 2 # Neutral
    
    score += a11y_score

    # -----------------------------
    # 7. Visual Noise / Chaos Detector
    # -----------------------------
    if data["link_count"] > 80 and data["total_images"] > 40:
        score -= weights["bloat_penalty"]
        suggestions.append("Page appears visually cluttered and chaotic.")

    # -----------------------------
    # 8. Legacy / Deprecated HTML
    # -----------------------------
    dep_count = data["deprecated_tag_count"]
    if dep_count > 0:
        penalty = min(40, dep_count * 8)
        score -= penalty
        if persona == "design_lead":
             suggestions.append(f"Clean up code: {dep_count} deprecated tags found.")
        else:
             suggestions.append(f"Outdated HTML detected ({dep_count} tags).")

    # -----------------------------
    # Persona Specific Adjustments
    # -----------------------------
    if persona == "recruiter":
        # Recruiters NEED to see "Resume" or "CV" or "LinkedIn"
        # Since we don't have body text scan for keywords easily in 'scanner.py' yet (opt),
        # we'll assume if links > 0, we're okay, but ideally we'd scan for specific link text.
        # For now, let's keep it generic but phrased for them.
         pass
         
    if persona == "client" and score > 80:
        insights.append("This site builds trust instantly.")

    # -----------------------------
    # 9. AI Suggested Questions (Pro+)
    # -----------------------------
    ai_questions = []
    
    # Context-aware question generation
    if score < 60:
        ai_questions.append({
            "question": "What are the top 3 'quick wins' to immediately boost my score?",
            "answer": "1. Add a meta description. 2. Ensure mobile responsiveness (viewport tag). 3. Add H1 headings to every page."
        })
    
    if not data["has_viewport"]:
        ai_questions.append({
            "question": "How do I properly configure the viewport meta tag?",
            "answer": "Add this to your <head>: <meta name='viewport' content='width=device-width, initial-scale=1.0'>. This ensures your site scales correctly on mobile devices."
        })
        
    if data["description_length"] < 50:
        ai_questions.append({
            "question": "What makes a compelling meta description?",
            "answer": "It should be 150-160 characters, distinct for each page, and include keywords that describe your role (e.g., 'Product Designer based in SF')."
        })
        
    if heading_count < 2:
        ai_questions.append({
            "question": "How should I structure my headings (H1-H6)?",
            "answer": "Use one <H1> for the main title, <H2> for major sections (About, Work), and <H3> for project details. Never skip levels (e.g., H1 to H3)."
        })
        
    if "images_without_alt" in data and data["images_without_alt"] > 0:
        ai_questions.append({
            "question": "Best practices for writing accessible alt text?",
            "answer": "Describe the content and function of the image. Avoid 'image of...' start. Keep it under 125 characters unless it's a complex diagram."
        })
        
    # Default fillers if we don't have enough
    defaults = [
        {
            "question": "How can I better articulate my design process?",
            "answer": "Focus on the 'Why' and 'How', not just the 'What'. Use the STAR method (Situation, Task, Action, Result) for each case study."
        },
        {
            "question": "What specific sections are hiring managers looking for?",
            "answer": "They look for: 1. Strong Case Studies, 2. concise 'About Me', 3. Resume/CV download, and 4. Easy access to Contact info."
        },
        {
            "question": "How can I optimize my images for faster load times?",
            "answer": "Use WebP format, compress images using tools like TinyPNG, and implement lazy loading (<img loading='lazy'>) for off-screen images."
        }
    ]
    
    for q in defaults:
        if len(ai_questions) < 3:
            # Check for duplicates based on question string
            if not any(existing['question'] == q['question'] for existing in ai_questions):
                ai_questions.append(q)
                
    # Cap at 3 questions
    ai_questions = ai_questions[:3]

    # -----------------------------
    # Final normalization
    # -----------------------------
    score = int(max(0, min(100, score)))


    # -----------------------------
    # BENCHMARKS (Simulated based on score)
    # -----------------------------
    # In a real app, this would query a DB of all scans.
    # Here we simulate percentiles based on the raw score.
    benchmarks = []
    
    # Heuristics for simulation
    speed_percentile = min(99, int(score * 0.95 + (5 if is_spa else 0)))
    ux_percentile = min(99, int(score * 0.9))
    mobile_percentile = 95 if data["has_viewport"] else 15
    
    benchmarks.append({
        "category": "Speed",
        "percentile": speed_percentile,
        "text": f"Top {100-speed_percentile}%" if speed_percentile > 80 else f"Bottom {speed_percentile}%"
    })
    
    benchmarks.append({
        "category": "UX/Storytelling",
        "percentile": ux_percentile,
        "text": f"Top {100-ux_percentile}%" if ux_percentile > 80 else "Average"
    })
    
    benchmarks.append({
        "category": "Mobile Friendliness",
        "percentile": mobile_percentile,
        "text": "Excellent" if mobile_percentile > 90 else "Needs Work"
    })


    # -----------------------------
    # 10. Dashboard Category Scores
    # -----------------------------
    category_scores = {
        "Design": int(max(0, min(100, (struct_score + weights["mobile"] + a11y_score) / (weights["structure"] + weights["mobile"] + weights["a11y"]) * 100))),
        "Content": int(max(0, min(100, content_score / weights["content"] * 100))),
        "SEO": int(max(0, min(100, seo_score / weights["seo"] * 100))),
        "Performance": int(max(0, min(100, (stack_score + (5 if is_spa else 0)) / (weights["tech"] + 5) * 100)))
    }

    return {
        "score": score,
        "insights": insights,
        "suggestions": suggestions,
        "ai_questions": ai_questions,
        "benchmarks": benchmarks,
        "category_scores": category_scores
    }


def rewrite_text(text: str, tone: str) -> str:
    """
    Simulates AI rewriting by applying tone-specific transformations.
    """
    if not text:
        return ""
        
    text = text.strip()
    
    if tone == "professional":
        return f"Passionate professional with a proven track record in the industry. Dedicated to delivering high-quality results. {text}"
    
    elif tone == "creative":
        return f"Dreamer, Creator, and Innovator. I craft digital experiences that tell a story. {text}"
        
    elif tone == "minimal":
        return f"Designer & Developer. {text[:50]}..."
        
    return text
