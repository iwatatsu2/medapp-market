const puppeteer = require('puppeteer');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const SLIDE_DIR = __dirname;
const SLIDES = [];
for (let i = 1; i <= 13; i++) {
  const name = `slide${String(i).padStart(2, '0')}`;
  const htmlPath = path.join(SLIDE_DIR, `${name}.html`);
  if (fs.existsSync(htmlPath)) SLIDES.push(name);
}

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });

  for (const name of SLIDES) {
    const htmlPath = path.join(SLIDE_DIR, `${name}.html`);
    const pngPath = path.join(SLIDE_DIR, `${name}_new.png`);
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 10000 });
    await page.screenshot({ path: pngPath, clip: { x: 0, y: 0, width: 1280, height: 720 } });
    console.log(`  ✓ ${name}_new.png`);
  }

  await browser.close();
  console.log('\nAll PNGs generated. Creating PPTX...');

  // Generate PPTX via python
  const pngFiles = SLIDES.map(s => path.join(SLIDE_DIR, `${s}_new.png`));
  const outputPptx = path.join(SLIDE_DIR, 'DM_Compass_vol2_ケトン体測定の判定基準_centered.pptx');

  const pyScript = `
import sys
from pptx import Presentation
from pptx.util import Inches, Emu

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

images = ${JSON.stringify(pngFiles)}
for img_path in images:
    slide_layout = prs.slide_layouts[6]  # blank
    slide = prs.slides.add_slide(slide_layout)
    slide.shapes.add_picture(img_path, Emu(0), Emu(0), prs.slide_width, prs.slide_height)

prs.save("${outputPptx.replace(/\\/g, '\\\\')}")
print(f"PPTX saved: ${outputPptx}")
`;

  fs.writeFileSync('/tmp/gen_pptx.py', pyScript);
  execSync('python3 /tmp/gen_pptx.py', { stdio: 'inherit' });
})();
