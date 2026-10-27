import zlib
import struct
import math

def create_png(width, height, filename):
    # RGBA image buffer
    raw_data = bytearray()
    
    cx, cy = width / 2.0, height / 2.0
    radius = width * 0.45
    
    for y in range(height):
        raw_data.append(0)  # filter type None
        for x in range(width):
            dx = x - cx
            dy = y - cy
            dist = math.sqrt(dx*dx + dy*dy)
            
            # Background circle with vibrant blue gradient
            if dist <= radius:
                # Radial gradient from bright cyan to deep royal blue
                ratio = dist / radius
                r = int(14 + (2 - 14) * ratio)
                g = int(165 + (132 - 165) * ratio)
                b = int(233 + (199 - 233) * ratio)
                a = 255
                
                # Atom orbit ring (ellipse)
                angle = math.atan2(dy, dx)
                # Draw a science flask shape or star in the center
                # Flask neck: abs(dx) < width * 0.08 and -height*0.25 < dy < -height*0.05
                # Flask body: triangle downwards
                in_flask = False
                if abs(dx) < width * 0.08 and -height * 0.28 <= dy <= -height * 0.08:
                    in_flask = True
                elif dy > -height * 0.08 and dy < height * 0.25:
                    body_w = width * 0.08 + (dy - (-height * 0.08)) * 0.8
                    if abs(dx) <= body_w:
                        in_flask = True
                        
                # Liquid in flask
                if in_flask:
                    if dy > 0.02 * height: # Liquid: glowing amber/yellow
                        r, g, b, a = 251, 191, 36, 255
                        # Bubbles
                        if ((x - cx)**2 + (y - (cy + height*0.1))**2) < (width*0.03)**2:
                            r, g, b, a = 254, 240, 138, 255
                    else: # Flask glass: crisp white/cyan highlight
                        r, g, b, a = 255, 255, 255, 240
                
                # Orbit ring
                orbit_dist = abs(math.sqrt((dx * 0.8)**2 + (dy * 1.5)**2) - width * 0.28)
                if orbit_dist < width * 0.02:
                    r, g, b, a = 255, 255, 255, 220
                    
            else:
                r, g, b, a = 0, 0, 0, 0 # Transparent outside circle
                
            raw_data.extend([r, g, b, a])
            
    def chunk(tag, data):
        return struct.pack('!I', len(data)) + tag + data + struct.pack('!I', zlib.crc32(tag + data) & 0xffffffff)

    png_header = b'\x89PNG\r\n\x1a\n'
    ihdr = struct.pack('!IIBBBBB', width, height, 8, 6, 0, 0, 0)
    compressed = zlib.compress(bytes(raw_data), 9)
    
    with open(filename, 'wb') as f:
        f.write(png_header)
        f.write(chunk(b'IHDR', ihdr))
        f.write(chunk(b'IDAT', compressed))
        f.write(chunk(b'IEND', b''))

create_png(192, 192, 'C:/Users/user/mini-science-lab/assets/icons/icon-192.png')
create_png(512, 512, 'C:/Users/user/mini-science-lab/assets/icons/icon-512.png')
print("Successfully generated icon-192.png and icon-512.png")
