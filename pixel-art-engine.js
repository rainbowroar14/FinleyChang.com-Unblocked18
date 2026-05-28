/**
 * Renders hardcoded pixel matrices to crisp SVG (only <rect> tiles).
 * No canvas paths — scales 32×32 art to 64×64 display by default.
 */
const PixelArt = (() => {
  const DEFAULT_SCALE = 2;

  function createMatrix(w, h, fill = ".") {
    return Array.from({ length: h }, () => Array.from({ length: w }, () => fill));
  }

  function cloneMatrix(m) {
    return m.map((row) => [...row]);
  }

  function set(matrix, x, y, color) {
    if (y < 0 || y >= matrix.length || x < 0 || x >= matrix[0].length) return;
    matrix[y][x] = color;
  }

  function get(matrix, x, y) {
    if (y < 0 || y >= matrix.length || x < 0 || x >= matrix[0].length) return ".";
    return matrix[y][x];
  }

  /** Outer silhouette: color-fading style dark outline on transparent edges */
  function applySilhouetteOutline(matrix, outlineChar = "O") {
    const h = matrix.length;
    const w = matrix[0].length;
    const out = cloneMatrix(matrix);
    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (matrix[y][x] === ".") continue;
        let border = false;
        for (const [dx, dy] of dirs) {
          if (get(matrix, x + dx, y + dy) === ".") border = true;
        }
        if (border) out[y][x] = outlineChar;
      }
    }

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (matrix[y][x] === ".") continue;
        if (out[y][x] === outlineChar) continue;
        out[y][x] = matrix[y][x];
      }
    }

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (matrix[y][x] === ".") continue;
        let border = false;
        for (const [dx, dy] of dirs) {
          if (get(matrix, x + dx, y + dy) === ".") border = true;
        }
        if (border) out[y][x] = outlineChar;
      }
    }

    return out;
  }

  function matrixToSvg(matrix, palette, scale = DEFAULT_SCALE) {
    const h = matrix.length;
    const w = matrix[0].length;
    const size = w * scale;
    const parts = [
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" shape-rendering="crispEdges">`,
    ];

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const ch = matrix[y][x];
        if (ch === ".") continue;
        const fill = palette[ch];
        if (!fill) continue;
        parts.push(
          `<rect x="${x * scale}" y="${y * scale}" width="${scale}" height="${scale}" fill="${fill}"/>`
        );
      }
    }

    parts.push("</svg>");
    return parts.join("");
  }

  function render(matrix, palette, scale = DEFAULT_SCALE) {
    const outlined = applySilhouetteOutline(matrix, "O");
    return matrixToSvg(outlined, palette, scale);
  }

  function mount(el, matrix, palette, scale = DEFAULT_SCALE) {
    if (!el) return;
    el.innerHTML = render(matrix, palette, scale);
    el.classList.add("pixel-art-canvas");
  }

  function mountById(spriteId, palette, scale = DEFAULT_SCALE) {
    const def = PixelSprites?.[spriteId];
    if (!def) return null;
    return { matrix: def.matrix, palette: palette || def.palette, scale };
  }

  return {
    createMatrix,
    cloneMatrix,
    set,
    get,
    applySilhouetteOutline,
    matrixToSvg,
    render,
    mount,
    DEFAULT_SCALE,
  };
})();
