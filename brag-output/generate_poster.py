import zlib
import struct
import math
import os

def create_poster(width, height, filepath):
    raw_data = bytearray()
    
    for y in range(height):
        raw_data.append(0)  # None filter
        v_ratio = y / float(height)
        
        for x in range(width):
            h_ratio = x / float(width)
            
            # Deep cosmic gradient from #0284c7 to #0369a1
            r = int(2 + (3 - 2) * v_ratio)
            g = int(132 + (105 - 132) * v_ratio)
            b = int(199 + (161 - 199) * v_ratio)
            
            # Radial highlight in top center
            dx = (x - width * 0.5) / float(width * 0.5)
            dy = (y - height * 0.35) / float(height * 0.5)
            d = math.sqrt(dx*dx + dy*dy)
            if d < 1.0:
                glow = (1.0 - d) * 0.35
                r = min(255, int(r + 56 * glow))
                g = min(255, int(g + 189 * glow))
                b = min(255, int(b + 248 * glow))

            # Gold decorative bottom bar
            if y > height - 16:
                r, g, b = 245, 158, 11
                
            raw_data.append(r)
            raw_data.append(g)
            raw_data.append(b)
            raw_data.append(255)

    def png_chunk(chunk_type, data):
        return struct.pack('>I', len(data)) + chunk_type + data + struct.pack('>I', zlib.crc32(chunk_type + data) & 0xffffffff)

    header = b'\x89PNG\r\n\x1a\n'
    ihdr = png_chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0))
    idat = png_chunk(b'IDAT', zlib.compress(bytes(raw_data), 6))
    iend = png_chunk(b'IEND', b'')

    with open(filepath, 'wb') as f:
        f.write(header + ihdr + idat + iend)
    print(f"Generated poster at {filepath}")

if __name__ == '__main__':
    out_dir = r"C:\Users\user\mini-science-lab\brag-output"
    create_poster(960, 540, os.path.join(out_dir, "brag-poster.png"))
