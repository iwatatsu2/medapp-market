// ストーリーズ用HTML(1080x1920)をPNGにする。使い方: node scripts/render-story.mjs <in.html> <out.png>
import puppeteer from "puppeteer";
import path from "node:path";
import { pathToFileURL } from "node:url";
const [, , inHtml, outPng] = process.argv;
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(path.resolve(inHtml)).href, { waitUntil: "networkidle0" });
await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
await (await page.$(".wrap")).screenshot({ path: path.resolve(outPng) });
await browser.close();
