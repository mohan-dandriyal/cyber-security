const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function generate() {
  const width = 640, height = 400, frames = 40;
  const pixels = Buffer.alloc(width * height * frames * 3);
  for (let frame = 0; frame < frames; frame++) {
    const nodes = Array.from({ length: 16 }, (_, i) => {
      const vertical = i % 2 === 0;
      const travel = (frame / frames + i / 16) % 1;
      return {
        x: vertical ? 40 + (i * 40) % 600 : travel * width,
        y: vertical ? travel * height : 40 + (i * 40) % 360,
        vertical,
      };
    });
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      let light = (x % 80 === 40 || y % 80 === 40) ? 0.07 : 0;
      light += 0.07 * Math.max(0, 1 - Math.hypot((x - 320) / 360, (y - 180) / 240));
      for (const node of nodes) {
        const dx = Math.abs(x - node.x), dy = Math.abs(y - node.y);
        const distance = Math.hypot(dx, dy);
        light += Math.max(0, 1 - distance / 12) * 0.25;
        if (distance < 2) light += 0.6;
        if (node.vertical ? dx < 1.2 && y < node.y && dy < 48 : dy < 1.2 && x < node.x && dx < 48) {
          light += (1 - (node.vertical ? dy : dx) / 48) * 0.4;
        }
      }
      const index = ((frame * height + y) * width + x) * 3;
      pixels[index] = 0;
      pixels[index + 1] = Math.min(255, 18 + light * 210);
      pixels[index + 2] = Math.min(255, 40 + light * 220);
    }
  }
  const directory = path.join(__dirname, "../public/backgrounds");
  fs.mkdirSync(directory, { recursive: true });
  await sharp(pixels, { raw: { width, height: height * frames, channels: 3, pageHeight: height } })
    .gif({ loop: 0, delay: 100, colours: 64, dither: 0 })
    .toFile(path.join(directory, "cyber-grid.gif"));
  await sharp(pixels.subarray(0, width * height * 3), { raw: { width, height, channels: 3 } })
    .png().toFile(path.join(directory, "cyber-grid-still.png"));
  const metadata = await sharp(path.join(directory, "cyber-grid.gif"), { animated: true }).metadata();
  console.log({ width: metadata.width, pages: metadata.pages, bytes: fs.statSync(path.join(directory, "cyber-grid.gif")).size });
}

generate().catch(error => { console.error(error); process.exitCode = 1; });
