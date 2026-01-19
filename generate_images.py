"""
Generate Banaras/Varanasi illustrations for wedding website
Uses Gemini API to create modern, minimalist Indian motif illustrations
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Add parent directory to path to import gemini client
sys.path.append(str(Path(__file__).parent.parent / "final_architecture" / "clients"))

from gemini_image_client import GeminiImageClient

# Load environment variables
env_path = Path(__file__).parent / ".env"
load_dotenv(env_path)

def generate_banaras_illustrations():
    """Generate all required Banaras illustrations with consistent design style"""
    
    client = GeminiImageClient()
    
    # Create assets directory
    assets_dir = Path(__file__).parent / "assets" / "illustrations"
    assets_dir.mkdir(parents=True, exist_ok=True)
    
    # Consistent style parameters for all images - SPECIFICALLY VARANASI/BANARAS THEMED
    STYLE_BASE = (
        "Authentic Varanasi (Banaras/Kashi) themed illustration, "
        "specifically depicting real Varanasi landmarks, ghats, and cultural elements, "
        "rich watercolor technique with vivid colors and bold washes, "
        "consistent vibrant color palette: deep rich maroon (#8B0000), bright saffron orange (#FF9933), "
        "vibrant gold (#FFD700), warm terracotta, rich burgundy, "
        "brilliant sunset oranges and yellows, deep purples, "
        "saturated colors throughout, high color saturation, "
        "bold and vibrant color application, "
        "rich color gradients and transitions, "
        "warm glowing colors, "
        "sophisticated watercolor and ink technique with vibrant pigments, "
        "elegant line work with rich color fills, "
        "professional wedding invitation quality, "
        "NO TEXT, NO WORDS, NO LETTERING, NO TYPography, "
        "NO WHITE BACKGROUND, NO WHITE PADDING, NO WHITE BORDERS, NO WHITE SPACE AROUND EDGES, "
        "NO FRAME, NO BORDER, NO MARGIN, "
        "illustration fills entire image from edge to edge, "
        "transparent background or colored background that matches the illustration, "
        "purely visual illustration only, "
        "consistent artistic style across all images, "
        "vibrant, colorful, and sophisticated aesthetic, "
        "authentic Varanasi/Banaras representation"
    )
    
    # List of illustrations to generate - Enhanced prompts with consistent style
    illustrations = [
        {
            "name": "banaras_ghats",
            "prompt": f"{STYLE_BASE}, "
                     "Authentic Varanasi ghats illustration showing Dashashwamedh Ghat or Manikarnika Ghat, "
                     "detailed stone steps (ghats) leading down to holy Ganges river, "
                     "traditional multi-story buildings with balconies and domes typical of Varanasi architecture, "
                     "boats (dhonis) floating on Ganges river, "
                     "people performing rituals on the ghats, "
                     "morning aarti or evening aarti scene with diyas and lamps, "
                     "brilliant sunset or sunrise colors: bright oranges, deep reds, golden yellows, "
                     "vivid saffron sky with warm glowing sun over Ganges, "
                     "detailed stone steps in rich terracotta and ochre colors, "
                     "colorful reflections in Ganges water, "
                     "intricate architectural details of ancient Varanasi buildings, "
                     "rich depth and texture with bold color washes, "
                     "atmospheric perspective with vibrant color gradients, "
                     "authentic Varanasi ghats scene, highly saturated and colorful throughout",
            "aspect_ratio": "16:9"
        },
        {
            "name": "banaras_temple",
            "prompt": f"{STYLE_BASE}, "
                     "Authentic Kashi Vishwanath Temple (Golden Temple) of Varanasi illustration, "
                     "distinctive gold-plated domes and spires characteristic of Kashi Vishwanath, "
                     "temple complex with multiple domes and shikharas, "
                     "narrow lanes (galis) of Varanasi surrounding the temple, "
                     "traditional Varanasi architecture with intricate carvings, "
                     "rich maroon and deep red temple walls, bright gold spires and domes, "
                     "vibrant saffron flags and decorative elements, "
                     "devotees and priests visible, "
                     "dramatic lighting with golden hour glow creating vibrant color contrasts, "
                     "depth and dimension with rich color gradients, "
                     "authentic Varanasi temple architecture, "
                     "highly saturated colors, vibrant and colorful throughout, centered composition",
            "aspect_ratio": "1:1"
        },
        {
            "name": "diya_pattern",
            "prompt": f"{STYLE_BASE}, "
                     "Varanasi aarti diyas pattern - traditional oil lamps used in Ganges aarti ceremony, "
                     "ornate diyas (traditional Indian oil lamps) arranged in flowing geometric composition, "
                     "bright golden flames with warm orange and yellow glow effects, "
                     "rich maroon and deep red diya bases, vibrant saffron decorations, "
                     "intricate decorative details on each diya in brilliant colors, "
                     "warm glowing light radiating from each diya, "
                     "pattern inspired by evening Ganga aarti at Dashashwamedh Ghat, "
                     "depth and layering with vibrant color washes, "
                     "traditional Varanasi aarti ceremony motif, "
                     "highly saturated colors, bright and colorful throughout, "
                     "detailed craftsmanship, elegant spacing and rhythm",
            "aspect_ratio": "1:1"
        },
        {
            "name": "mandala_border",
            "prompt": f"{STYLE_BASE}, "
                     "Vibrant colorful intricate mandala border pattern with detailed geometric motifs, "
                     "rich maroon and deep red patterns, bright gold accents, "
                     "vibrant saffron and orange decorative elements, "
                     "traditional Indian wedding design elements in brilliant colors, "
                     "complex symmetry and precision with vibrant color fills, "
                     "ornate decorative details in highly saturated colors, "
                     "elegant line work with rich vibrant color depth, "
                     "wedding invitation border design, traditional patterns with contemporary refinement, "
                     "bright and colorful throughout, detailed craftsmanship, sophisticated horizontal composition",
            "aspect_ratio": "16:9"
        },
        {
            "name": "lotus_illustration",
            "prompt": f"{STYLE_BASE}, "
                     "Vibrant colorful artistic illustration of blooming lotus flower, "
                     "brilliant pink and white petals with vibrant green leaves, "
                     "rich maroon and deep red accents, bright gold center, "
                     "intricate petals with delicate veining in vivid colors, "
                     "rich watercolor technique with bold vibrant gradients, "
                     "warm colorful background with vibrant color washes, "
                     "elegant composition, depth and dimension with saturated colors, "
                     "traditional Indian wedding symbol rendered with modern sophistication, "
                     "highly saturated and colorful throughout, centered floral composition",
            "aspect_ratio": "1:1"
        },
        {
            "name": "peacock_feather",
            "prompt": f"{STYLE_BASE}, "
                     "Vibrant colorful detailed illustration of peacock feather, "
                     "brilliant iridescent blues, greens, and purples in the eye pattern, "
                     "rich deep blue and teal body, bright gold and bronze accents, "
                     "intricate eye pattern with vibrant jewel tones, "
                     "graceful curves and flowing lines with rich color gradients, "
                     "detailed texture and shading in highly saturated colors, "
                     "traditional Indian wedding motif with contemporary refinement, "
                     "depth and dimension with vibrant color washes, "
                     "bright and colorful throughout, elegant vertical composition",
            "aspect_ratio": "1:1"
        },
        {
            "name": "banaras_skyline",
            "prompt": f"{STYLE_BASE}, "
                     "Authentic Varanasi skyline panorama showing iconic landmarks, "
                     "Kashi Vishwanath Temple golden domes prominently visible, "
                     "multiple ghats along Ganges river (Dashashwamedh, Manikarnika, Assi Ghat), "
                     "traditional Varanasi buildings with balconies, domes, and spires, "
                     "Ganges river (Ganga) flowing through the city, "
                     "boats (dhonis) on the river, "
                     "brilliant orange and red sunset sky with golden yellow highlights, "
                     "vibrant colorful temple spires and domes in rich maroon and gold, "
                     "detailed Varanasi architecture in warm vibrant tones, "
                     "Ganges river in foreground with vivid reflections in oranges and reds, "
                     "colorful ghats visible in rich terracotta and ochre, "
                     "rich atmospheric perspective with vibrant color gradients, "
                     "authentic Varanasi cityscape, highly saturated sunset colors throughout, elegant wide panoramic composition",
            "aspect_ratio": "21:9"
        },
        {
            "name": "floral_pattern",
            "prompt": f"{STYLE_BASE}, "
                     "Vibrant colorful intricate Indian floral pattern inspired by marigold and jasmine, "
                     "bright orange and yellow marigold flowers, white and cream jasmine blooms, "
                     "vibrant green leaves, rich maroon and deep red accents, bright gold highlights, "
                     "detailed petals and leaves in highly saturated colors, "
                     "ornate decorative arrangement with vibrant color fills, "
                     "depth and layering with rich color gradients, "
                     "traditional Indian wedding motifs with contemporary sophistication, "
                     "bright and colorful throughout, detailed craftsmanship, refined horizontal border composition",
            "aspect_ratio": "16:9"
        },
        {
            "name": "ganga_art",
            "prompt": f"{STYLE_BASE}, "
                     "Authentic Ganges river (Ganga) flowing through Varanasi illustration, "
                     "holy Ganges river with ghats on both banks, "
                     "traditional boats (dhonis) with boatmen, "
                     "people performing morning rituals and bathing in Ganges, "
                     "ghats with stone steps leading to river, "
                     "traditional Varanasi buildings lining the ghats, "
                     "morning aarti scene with diyas and lamps, "
                     "brilliant sunrise colors: bright oranges, golden yellows, warm pinks, "
                     "vivid colorful ghats on both sides in rich terracotta and ochre, "
                     "morning light with warm colorful mist over Ganges, "
                     "intricate Varanasi architectural details in vibrant warm tones, "
                     "vivid water reflections in oranges and golds, "
                     "authentic Ganges river scene in Varanasi, "
                     "depth and atmosphere with rich vibrant color washes, "
                     "highly saturated colors throughout, elegant and sophisticated horizontal landscape composition",
            "aspect_ratio": "16:9"
        },
        {
            "name": "ornamental_divider",
            "prompt": f"{STYLE_BASE}, "
                     "Vibrant colorful ornamental divider pattern with intricate Indian motifs, "
                     "rich maroon and deep red patterns, bright gold accents, "
                     "vibrant saffron and orange decorative elements, "
                     "detailed geometric and floral elements in highly saturated colors, "
                     "elegant line work with rich vibrant color fills and depth, "
                     "traditional design with modern refinement, "
                     "bright and colorful throughout, detailed craftsmanship, "
                     "horizontal decorative element composition",
            "aspect_ratio": "21:9"
        }
    ]
    
    print("🎨 Starting enhanced image generation for Banaras illustrations...\n")
    print("📝 Using sophisticated, detailed prompts for professional quality illustrations\n")
    
    generated_files = []
    failed_files = []
    
    for i, illustration in enumerate(illustrations, 1):
        print(f"[{i}/{len(illustrations)}] Generating {illustration['name']}...")
        print(f"   Prompt length: {len(illustration['prompt'])} characters")
        
        output_path = assets_dir / f"{illustration['name']}.png"
        
        try:
            result = client.generate_image(
                prompt=illustration['prompt'],
                output_path=str(output_path),
                aspect_ratio=illustration.get('aspect_ratio')
            )
            
            if result['success']:
                print(f"   ✅ Successfully generated: {output_path}")
                if 'generation_time' in result:
                    print(f"   ⏱️  Generation time: {result['generation_time']:.2f}s")
                generated_files.append(output_path)
            else:
                error_msg = result.get('error', 'Unknown error')
                print(f"   ❌ Failed: {error_msg}")
                failed_files.append((illustration['name'], error_msg))
        except Exception as e:
            print(f"   ❌ Exception: {str(e)}")
            failed_files.append((illustration['name'], str(e)))
        
        print()  # Empty line for readability
    
    print(f"\n{'='*60}")
    print(f"✨ Summary: Generated {len(generated_files)}/{len(illustrations)} illustrations")
    print(f"📁 Files saved to: {assets_dir}")
    
    if failed_files:
        print(f"\n⚠️  Failed generations ({len(failed_files)}):")
        for name, error in failed_files:
            print(f"   - {name}: {error}")
    
    print(f"{'='*60}\n")
    
    return generated_files

if __name__ == "__main__":
    try:
        generate_banaras_illustrations()
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
