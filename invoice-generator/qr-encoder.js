/* Compact QR Code Model 2 byte-mode encoder, versions 1-5, error correction L.
 * MIT License. Copyright (c) 2026 Invoice Generator contributors.
 */
(function () {
  "use strict";
  const DATA = [0, 19, 34, 55, 80, 108];
  const ECC = [0, 7, 10, 15, 20, 26];
  const EXP = new Uint8Array(512);
  const LOG = new Uint8Array(256);
  let value = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = value; LOG[value] = i; value <<= 1;
    if (value & 0x100) value ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
  const multiply = (a, b) => a && b ? EXP[LOG[a] + LOG[b]] : 0;
  function remainder(data, degree) {
    let polynomial = [1];
    for (let i = 0; i < degree; i++) {
      const next = new Array(polynomial.length + 1).fill(0);
      polynomial.forEach((coefficient, index) => {
        next[index] ^= coefficient;
        next[index + 1] ^= multiply(coefficient, EXP[i]);
      });
      polynomial = next;
    }
    const result = new Array(degree).fill(0);
    data.forEach((byte) => {
      const factor = byte ^ result.shift();
      result.push(0);
      for (let i = 0; i < degree; i++) result[i] ^= multiply(polynomial[i + 1], factor);
    });
    return result;
  }
  function maskAt(mask, x, y) {
    switch (mask) {
      case 0: return (x + y) % 2 === 0;
      case 1: return y % 2 === 0;
      case 2: return x % 3 === 0;
      case 3: return (x + y) % 3 === 0;
      case 4: return (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0;
      case 5: return (x * y) % 2 + (x * y) % 3 === 0;
      case 6: return ((x * y) % 2 + (x * y) % 3) % 2 === 0;
      default: return ((x + y) % 2 + (x * y) % 3) % 2 === 0;
    }
  }
  function makeMatrix(data, version, mask) {
    const size = version * 4 + 17;
    const modules = Array.from({ length: size }, () => new Array(size).fill(false));
    const fixed = Array.from({ length: size }, () => new Array(size).fill(false));
    function set(x, y, dark) {
      if (x >= 0 && x < size && y >= 0 && y < size) {
        modules[y][x] = Boolean(dark); fixed[y][x] = true;
      }
    }
    function finder(cx, cy) {
      for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
        const distance = Math.max(Math.abs(dx), Math.abs(dy));
        set(cx + dx, cy + dy, distance !== 2 && distance !== 4);
      }
    }
    finder(3, 3); finder(size - 4, 3); finder(3, size - 4);
    for (let i = 8; i < size - 8; i++) {
      set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0);
    }
    const centers = version === 1 ? [] : version === 2 ? [6, 18] : version === 3 ? [6, 22] : version === 4 ? [6, 26] : [6, 30];
    centers.forEach((cy) => centers.forEach((cx) => {
      if (fixed[cy][cx]) return;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
        set(cx + dx, cy + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
      }
    }));
    function format() {
      const dataBits = 8 | mask;
      let rem = dataBits;
      for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
      const bits = ((dataBits << 10) | rem) ^ 0x5412;
      for (let i = 0; i <= 5; i++) set(8, i, ((bits >>> i) & 1) !== 0);
      set(8, 7, ((bits >>> 6) & 1) !== 0); set(8, 8, ((bits >>> 7) & 1) !== 0); set(7, 8, ((bits >>> 8) & 1) !== 0);
      for (let i = 9; i < 15; i++) set(14 - i, 8, ((bits >>> i) & 1) !== 0);
      for (let i = 0; i < 8; i++) set(size - 1 - i, 8, ((bits >>> i) & 1) !== 0);
      for (let i = 8; i < 15; i++) set(8, size - 15 + i, ((bits >>> i) & 1) !== 0);
      set(8, size - 8, true);
    }
    format();
    let bitIndex = 0;
    for (let right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let vertical = 0; vertical < size; vertical++) {
        const y = ((right + 1) & 2) === 0 ? size - 1 - vertical : vertical;
        for (let offset = 0; offset < 2; offset++) {
          const x = right - offset;
          if (!fixed[y][x]) {
            let dark = bitIndex < data.length * 8 && ((data[bitIndex >>> 3] >>> (7 - (bitIndex & 7))) & 1) !== 0;
            if (maskAt(mask, x, y)) dark = !dark;
            modules[y][x] = dark; bitIndex++;
          }
        }
      }
    }
    format();
    return modules;
  }
  function penalty(matrix) {
    const size = matrix.length;
    let score = 0;
    for (let axis = 0; axis < 2; axis++) {
      for (let line = 0; line < size; line++) {
        let run = 1;
        for (let i = 1; i < size; i++) {
          const current = axis ? matrix[i][line] : matrix[line][i];
          const prior = axis ? matrix[i - 1][line] : matrix[line][i - 1];
          if (current === prior) run++;
          else { if (run >= 5) score += run - 2; run = 1; }
        }
        if (run >= 5) score += run - 2;
        for (let i = 0; i <= size - 7; i++) {
          const pattern = [];
          for (let j = 0; j < 7; j++) pattern.push(axis ? matrix[i + j][line] : matrix[line][i + j]);
          if (pattern.join("") === "true,false,true,true,true,false,true") {
            const before = i >= 4 && Array.from({ length: 4 }, (_, n) => axis ? matrix[i - n - 1][line] : matrix[line][i - n - 1]).every((bit) => !bit);
            const after = i + 10 < size && Array.from({ length: 4 }, (_, n) => axis ? matrix[i + 7 + n][line] : matrix[line][i + 7 + n]).every((bit) => !bit);
            if (before || after) score += 40;
          }
        }
      }
    }
    for (let y = 0; y < size - 1; y++) for (let x = 0; x < size - 1; x++) {
      const bit = matrix[y][x];
      if (matrix[y][x + 1] === bit && matrix[y + 1][x] === bit && matrix[y + 1][x + 1] === bit) score += 3;
    }
    const dark = matrix.reduce((sum, row) => sum + row.filter(Boolean).length, 0);
    score += Math.floor(Math.abs(dark * 100 / (size * size) - 50) / 5) * 10;
    return score;
  }
  function encode(text) {
    const bytes = Array.from(new TextEncoder().encode(text));
    let version = 1;
    while (version <= 5 && bytes.length > Math.floor((DATA[version] * 8 - 12) / 8)) version++;
    if (version > 5) throw new Error("Payment text exceeds the offline QR code's 106-byte limit.");
    const bitStream = [];
    const append = (number, count) => { for (let i = count - 1; i >= 0; i--) bitStream.push((number >>> i) & 1); };
    append(4, 4); append(bytes.length, 8); bytes.forEach((byte) => append(byte, 8));
    const capacity = DATA[version] * 8;
    for (let i = 0; i < Math.min(4, capacity - bitStream.length); i++) bitStream.push(0);
    while (bitStream.length % 8) bitStream.push(0);
    const codewords = [];
    for (let i = 0; i < bitStream.length; i += 8) codewords.push(parseInt(bitStream.slice(i, i + 8).join(""), 2));
    for (let pad = 0; codewords.length < DATA[version]; pad++) codewords.push(pad % 2 ? 0x11 : 0xec);
    const fullData = codewords.concat(remainder(codewords, ECC[version]));
    let best; let bestScore = Infinity;
    for (let mask = 0; mask < 8; mask++) {
      const matrix = makeMatrix(fullData, version, mask);
      const score = penalty(matrix);
      if (score < bestScore) { best = matrix; bestScore = score; }
    }
    return best;
  }
  function draw(canvas, text) {
    const matrix = encode(String(text));
    const context = canvas.getContext("2d");
    const size = matrix.length;
    const scale = Math.floor(Math.min(canvas.width, canvas.height) / (size + 8));
    const offsetX = Math.floor((canvas.width - scale * (size + 8)) / 2);
    const offsetY = Math.floor((canvas.height - scale * (size + 8)) / 2);
    context.fillStyle = "#fff"; context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#111";
    matrix.forEach((row, y) => row.forEach((dark, x) => {
      if (dark) context.fillRect(offsetX + (x + 4) * scale, offsetY + (y + 4) * scale, scale, scale);
    }));
  }
  window.QRCodeEncoder = { encode, draw };
})();
