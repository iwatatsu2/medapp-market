import puppeteer from 'puppeteer';
import { readdir } from 'fs/promises';
import { resolve } from 'path';

const dir = resolve(import.meta.dirname);
const files = (await readdir(dir)).filter(f => /^slide\d+\.html$/.test(f)).sort();

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox']
});

for (const file of files) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });
  await page.goto(`file://${dir}/${file}`, { waitUntil: 'networkidle0' });
  const png = file.replace('.html', '.png');
  await page.screenshot({ path: resolve(dir, png), type: 'png' });
  await page.close();
  console.log(`✓ ${file} → ${png}`);
}

await browser.close();
console.log(`\nDone! ${files.length} slides converted.`);
