import struct
import zlib

width, height = 1200, 630

color_start = (12, 14, 33)
color_end = (76, 148, 224)

rows = []
for y in range(height):
    t = y / (height - 1)
    r = int(color_start[0] * (1 - t) + color_end[0] * t)
    g = int(color_start[1] * (1 - t) + color_end[1] * t)
    b = int(color_start[2] * (1 - t) + color_end[2] * t)
    row = bytearray()
    row.append(0)
    for _ in range(width):
        row.extend([r, g, b])
    rows.append(row)

pixel_data = b"".join(rows)
compressed = zlib.compress(pixel_data, level=6)

with open('public/og-default.png', 'wb') as f:
    f.write(b"\x89PNG\r\n\x1a\n")

    def chunk(chunk_type: bytes, data: bytes):
        f.write(struct.pack('!I', len(data)))
        f.write(chunk_type)
        f.write(data)
        crc = zlib.crc32(chunk_type + data) & 0xffffffff
        f.write(struct.pack('!I', crc))

    ihdr = struct.pack('!IIBBBBB', width, height, 8, 2, 0, 0, 0)
    chunk(b'IHDR', ihdr)
    chunk(b'IDAT', compressed)
    chunk(b'IEND', b'')
