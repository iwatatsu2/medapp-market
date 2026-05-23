import puppeteer from 'puppeteer';
import { resolve } from 'path';

const dir = resolve(import.meta.dirname);
const BASE = 'https://iwatatsu2.github.io/dm-compass/';

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox']
});

const vp = { width: 390, height: 844, deviceScaleFactor: 2 };

// 1. Home
const p1 = await browser.newPage();
await p1.setViewport(vp);
await p1.goto(BASE, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));
await p1.screenshot({ path: resolve(dir, 'mock-home.png'), type: 'png' });
console.log('✓ mock-home.png');

// 2. CALC - click on CALC card from home
const p2 = await browser.newPage();
await p2.setViewport(vp);
await p2.goto(BASE, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));
// Click the CALC card (first big card)
try {
  await p2.evaluate(() => {
    const links = document.querySelectorAll('a');
    for (const a of links) {
      if (a.textContent.includes('CALC') || a.href.includes('calc')) {
        a.click();
        return;
      }
    }
    // Try clicking card-like elements
    const cards = document.querySelectorAll('[class*="card"], [class*="Card"]');
    if (cards.length > 0) cards[0].click();
  });
  await new Promise(r => setTimeout(r, 2000));
} catch(e) { console.log('CALC nav error:', e.message); }
await p2.screenshot({ path: resolve(dir, 'mock-calc.png'), type: 'png' });
console.log('✓ mock-calc.png');

// 3. GUIDE - click on GUIDE card from home
const p3 = await browser.newPage();
await p3.setViewport(vp);
await p3.goto(BASE, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));
try {
  await p3.evaluate(() => {
    const links = document.querySelectorAll('a');
    for (const a of links) {
      if (a.textContent.includes('GUIDE') || a.href.includes('guide')) {
        a.click();
        return;
      }
    }
    const cards = document.querySelectorAll('[class*="card"], [class*="Card"]');
    if (cards.length > 1) cards[1].click();
  });
  await new Promise(r => setTimeout(r, 2000));
} catch(e) { console.log('GUIDE nav error:', e.message); }
await p3.screenshot({ path: resolve(dir, 'mock-guide.png'), type: 'png' });
console.log('✓ mock-guide.png');

await browser.close();
console.log('Done!');
