#!/usr/bin/env python3
"""Generate the Mini Science Lab app icon: legacy circular launcher PNGs
(for pre-Android-8 devices and the PWA manifest) plus a proper adaptive
icon (separate background + foreground layers) for modern Android.

Original artwork: a flask + spark glyph, drawn procedurally with Pillow.
Everything is rendered at 4x supersample and downsized for clean
anti-aliased edges, matching the app's existing palette (sky blue /
amber) and the sparkle-star motif already used by the robot mascot.
"""
import math
import os

from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ICONS_DIR = os.path.join(ROOT, "assets", "icons")
RES_DIR = os.path.join(ROOT, "android", "app", "src", "main", "res")

DEEP_BLUE = (2, 132, 199)
LIGHT_BLUE = (56, 189, 248)
AMBER = (251, 191, 36)
AMBER_DEEP = (245, 158, 11)
WHITE = (255, 255, 255)

SS = 4  # supersample factor


def diagonal_gradient(size, c_tl, c_br):
    """Small 2x2 corner gradient resized up for a smooth diagonal blend."""
    grad = Image.new("RGB", (2, 2))
    grad.putpixel((0, 0), c_tl)
    grad.putpixel((1, 0), tuple((a + b) // 2 for a, b in zip(c_tl, c_br)))
    grad.putpixel((0, 1), tuple((a + b) // 2 for a, b in zip(c_tl, c_br)))
    grad.putpixel((1, 1), c_br)
    return grad.resize((size, size), Image.BICUBIC)


def draw_flask(draw, cx, cy, scale, liquid_color_top, liquid_color_bot, outline=WHITE):
    """Flask glyph: rounded neck + conical body, liquid fill, 3 bubbles."""
    s = scale
    neck_w = 0.26 * s
    neck_top = cy - 0.62 * s
    neck_bot = cy - 0.14 * s
    body_half = 0.52 * s
    body_bot = cy + 0.58 * s

    # Body (glass) as a rounded trapezoid via polygon with eased corners
    body = [
        (cx - neck_w, neck_bot),
        (cx + neck_w, neck_bot),
        (cx + body_half, body_bot - 0.12 * s),
        (cx + body_half * 0.82, body_bot),
        (cx - body_half * 0.82, body_bot),
        (cx - body_half, body_bot - 0.12 * s),
    ]
    draw.polygon(body, fill=WHITE)
    draw.rounded_rectangle(
        [cx - neck_w, neck_top, cx + neck_w, neck_bot + 0.05 * s],
        radius=0.08 * s, fill=WHITE,
    )
    # Neck lip
    draw.rounded_rectangle(
        [cx - neck_w - 0.05 * s, neck_top - 0.05 * s, cx + neck_w + 0.05 * s, neck_top + 0.09 * s],
        radius=0.06 * s, fill=WHITE,
    )

    # Liquid fill (amber), clipped to the lower ~55% of the body with a
    # gently curved meniscus top edge
    liquid_top = cy + 0.02 * s
    liquid_w_at_top = body_half * 0.70
    liquid = [
        (cx - liquid_w_at_top, liquid_top + 0.05 * s),
        (cx - liquid_w_at_top * 0.5, liquid_top - 0.04 * s),
        (cx, liquid_top - 0.06 * s),
        (cx + liquid_w_at_top * 0.5, liquid_top - 0.04 * s),
        (cx + liquid_w_at_top, liquid_top + 0.05 * s),
        (cx + body_half * 0.88, body_bot - 0.1 * s),
        (cx + body_half * 0.78, body_bot),
        (cx - body_half * 0.78, body_bot),
        (cx - body_half * 0.88, body_bot - 0.1 * s),
    ]
    draw.polygon(liquid, fill=liquid_color_bot)

    # Bubbles
    for bx, by, br, op in [
        (cx - 0.12 * s, cy + 0.30 * s, 0.045 * s, 235),
        (cx + 0.16 * s, cy + 0.42 * s, 0.03 * s, 190),
        (cx + 0.02 * s, cy + 0.18 * s, 0.025 * s, 170),
    ]:
        draw.ellipse([bx - br, by - br, bx + br, by + br], fill=(255, 255, 255, op))

    # Outline
    draw.line(body + [body[0]], fill=outline, width=max(2, int(0.018 * s)), joint="curve")
    draw.rounded_rectangle(
        [cx - neck_w, neck_top, cx + neck_w, neck_bot + 0.05 * s],
        radius=0.08 * s, outline=outline, width=max(2, int(0.018 * s)),
    )


def draw_spark(draw, cx, cy, r, color):
    pts = []
    for i in range(8):
        ang = -math.pi / 2 + i * math.pi / 4
        rad = r if i % 2 == 0 else r * 0.4
        pts.append((cx + rad * math.cos(ang), cy + rad * math.sin(ang)))
    draw.polygon(pts, fill=color)


def render_legacy_master(size):
    """Self-contained circular badge (gradient bg + flask + spark), with
    transparent padding around it — used for the PWA manifest and as the
    pre-Android-8 fallback launcher icon."""
    big = size * SS
    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))

    badge_r = big * 0.47
    cx = cy = big / 2

    grad = diagonal_gradient(big, LIGHT_BLUE, DEEP_BLUE).convert("RGBA")
    mask = Image.new("L", (big, big), 0)
    ImageDraw.Draw(mask).ellipse([cx - badge_r, cy - badge_r, cx + badge_r, cy + badge_r], fill=255)
    img.paste(grad, (0, 0), mask)

    draw = ImageDraw.Draw(img, "RGBA")
    draw_flask(draw, cx, cy + big * 0.02, big * 0.34, AMBER, AMBER_DEEP)
    draw_spark(draw, cx + big * 0.24, cy - big * 0.26, big * 0.07, AMBER)

    return img.resize((size, size), Image.LANCZOS)


def render_adaptive_foreground(size):
    """Transparent canvas, flask + spark centered in the adaptive-icon
    safe zone (inner ~66% of the 108dp canvas gets masked by the OS)."""
    big = size * SS
    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img, "RGBA")
    cx = cy = big / 2
    draw_flask(draw, cx, cy + big * 0.02, big * 0.33, AMBER, AMBER_DEEP)
    draw_spark(draw, cx + big * 0.225, cy - big * 0.235, big * 0.065, AMBER)
    return img.resize((size, size), Image.LANCZOS)


def render_adaptive_background(size):
    big = size * SS
    grad = diagonal_gradient(big, LIGHT_BLUE, DEEP_BLUE).convert("RGBA")
    return grad.resize((size, size), Image.LANCZOS)


def main():
    os.makedirs(ICONS_DIR, exist_ok=True)

    master512 = render_legacy_master(512)
    master512.save(os.path.join(ICONS_DIR, "icon-512.png"))
    master512.resize((192, 192), Image.LANCZOS).save(os.path.join(ICONS_DIR, "icon-192.png"))
    print("Wrote assets/icons/icon-512.png + icon-192.png")

    legacy_sizes = {
        "mipmap-mdpi": 48,
        "mipmap-hdpi": 72,
        "mipmap-xhdpi": 96,
        "mipmap-xxhdpi": 144,
        "mipmap-xxxhdpi": 192,
    }
    for folder, px in legacy_sizes.items():
        out_dir = os.path.join(RES_DIR, folder)
        os.makedirs(out_dir, exist_ok=True)
        icon = master512.resize((px, px), Image.LANCZOS)
        icon.save(os.path.join(out_dir, "ic_launcher.png"))
        icon.save(os.path.join(out_dir, "ic_launcher_round.png"))
    print("Wrote legacy mipmap launcher icons (5 densities)")

    drawable_dir = os.path.join(RES_DIR, "drawable-xxxhdpi")
    os.makedirs(drawable_dir, exist_ok=True)
    render_adaptive_foreground(432).save(os.path.join(drawable_dir, "ic_launcher_foreground.png"))
    render_adaptive_background(432).save(os.path.join(drawable_dir, "ic_launcher_background.png"))
    print("Wrote adaptive icon layers (drawable-xxxhdpi)")

    anydpi_dir = os.path.join(RES_DIR, "mipmap-anydpi-v26")
    os.makedirs(anydpi_dir, exist_ok=True)
    adaptive_xml = """<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background" />
    <foreground android:drawable="@drawable/ic_launcher_foreground" />
</adaptive-icon>
"""
    for name in ("ic_launcher.xml", "ic_launcher_round.xml"):
        with open(os.path.join(anydpi_dir, name), "w") as f:
            f.write(adaptive_xml)
    print("Wrote mipmap-anydpi-v26/ic_launcher(.xml / _round.xml)")

    print("Done.")


if __name__ == "__main__":
    main()
