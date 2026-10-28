import { deflateSync, inflateSync } from 'node:zlib';

const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

// Decodifica solo el área necesaria del PNG RGBA oficial, sin dependencias nativas.
export function readRgbaCrop(png, bounds) {
  if (!png.subarray(0, 8).equals(signature)) throw new Error('El logo no es un PNG.');
  const width = png.readUInt32BE(16), height = png.readUInt32BE(20);
  if (png[24] !== 8 || png[25] !== 6 || png[28] !== 0) {
    throw new Error('Se necesita un PNG RGBA de 8 bits, sin entrelazado.');
  }
  const [left, top, cropWidth, cropHeight] = bounds;
  if (left < 0 || top < 0 || left + cropWidth > width || top + cropHeight > height) {
    throw new Error('El encuadre del logo excede la imagen.');
  }
  const chunks = [];
  for (let offset = 8; offset < png.length;) {
    const size = png.readUInt32BE(offset);
    if (png.toString('ascii', offset + 4, offset + 8) === 'IDAT') {
      chunks.push(png.subarray(offset + 8, offset + 8 + size));
    }
    offset += size + 12;
  }
  const raw = inflateSync(Buffer.concat(chunks));
  const stride = width * 4;
  if (raw.length !== height * (stride + 1)) throw new Error('Datos PNG incompletos.');
  let previous = Buffer.alloc(stride), current = Buffer.alloc(stride);
  const pixels = Buffer.alloc(cropWidth * cropHeight * 4);
  const paeth = (a, b, c) => {
    const p = a + b - c, da = Math.abs(p - a), db = Math.abs(p - b), dc = Math.abs(p - c);
    return da <= db && da <= dc ? a : db <= dc ? b : c;
  };
  for (let y = 0; y < top + cropHeight; y++) {
    const filter = raw[y * (stride + 1)], offset = y * (stride + 1) + 1;
    if (filter > 4) throw new Error('Filtro PNG no soportado.');
    for (let i = 0; i < stride; i++) {
      const a = i >= 4 ? current[i - 4] : 0, b = previous[i], c = i >= 4 ? previous[i - 4] : 0;
      const predictor = filter === 0 ? 0 : filter === 1 ? a : filter === 2 ? b : filter === 3 ? Math.floor((a + b) / 2) : paeth(a, b, c);
      current[i] = (raw[offset + i] + predictor) & 255;
    }
    if (y >= top) current.copy(pixels, (y - top) * cropWidth * 4, left * 4, (left + cropWidth) * 4);
    [current, previous] = [previous, current];
  }
  return { width: cropWidth, height: cropHeight, pixels };
}

// Compone el logo con alpha sobre el fondo oscuro, manteniendo sus colores.
export function composeLogo(source, width, height, logoWidth) {
  const background = [9, 11, 16];
  const pixels = Buffer.alloc(width * height * 4);
  for (let offset = 0; offset < pixels.length; offset += 4) {
    pixels[offset] = background[0]; pixels[offset + 1] = background[1];
    pixels[offset + 2] = background[2]; pixels[offset + 3] = 255;
  }
  const logoHeight = Math.round(logoWidth * source.height / source.width);
  const left = Math.round((width - logoWidth) / 2), top = Math.round((height - logoHeight) / 2);
  const sample = (x, y) => (Math.max(0, Math.min(source.height - 1, y)) * source.width + Math.max(0, Math.min(source.width - 1, x))) * 4;
  for (let y = 0; y < logoHeight; y++) {
    for (let x = 0; x < logoWidth; x++) {
      const sx = (x + .5) * source.width / logoWidth - .5, sy = (y + .5) * source.height / logoHeight - .5;
      const x0 = Math.floor(sx), y0 = Math.floor(sy), fx = sx - x0, fy = sy - y0;
      const samples = [sample(x0, y0), sample(x0 + 1, y0), sample(x0, y0 + 1), sample(x0 + 1, y0 + 1)];
      const weights = [(1 - fx) * (1 - fy), fx * (1 - fy), (1 - fx) * fy, fx * fy];
      let alpha = 0;
      const color = [0, 0, 0];
      samples.forEach((offset, index) => {
        const contribution = source.pixels[offset + 3] / 255 * weights[index];
        alpha += contribution;
        color.forEach((_, channel) => { color[channel] += source.pixels[offset + channel] * contribution; });
      });
      const target = ((top + y) * width + left + x) * 4;
      color.forEach((value, channel) => { pixels[target + channel] = Math.round(value + background[channel] * (1 - alpha)); });
    }
  }
  return { width, height, pixels };
}

const crcTable = Array.from({ length: 256 }, (_, value) => {
  for (let i = 0; i < 8; i++) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});
function chunk(type, data) {
  const name = Buffer.from(type), result = Buffer.alloc(data.length + 12);
  result.writeUInt32BE(data.length, 0); name.copy(result, 4); data.copy(result, 8);
  let crc = 0xffffffff;
  for (const byte of Buffer.concat([name, data])) crc = crcTable[(crc ^ byte) & 255] ^ (crc >>> 8);
  result.writeUInt32BE((crc ^ 0xffffffff) >>> 0, result.length - 4);
  return result;
}
export function encodePng({ width, height, pixels }) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0); header.writeUInt32BE(height, 4); header[8] = 8; header[9] = 6;
  const stride = width * 4, raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) pixels.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  return Buffer.concat([signature, chunk('IHDR', header), chunk('IDAT', deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}
export function encodeIco(frames) {
  const directory = Buffer.alloc(6 + frames.length * 16);
  directory.writeUInt16LE(1, 2); directory.writeUInt16LE(frames.length, 4);
  let offset = directory.length;
  frames.forEach(({ size, png }, index) => {
    const entry = 6 + index * 16;
    directory[entry] = size === 256 ? 0 : size; directory[entry + 1] = size === 256 ? 0 : size;
    directory.writeUInt16LE(1, entry + 4); directory.writeUInt16LE(32, entry + 6);
    directory.writeUInt32LE(png.length, entry + 8); directory.writeUInt32LE(offset, entry + 12);
    offset += png.length;
  });
  return Buffer.concat([directory, ...frames.map(frame => frame.png)]);
}
