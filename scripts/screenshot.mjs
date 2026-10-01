// Takes a screenshot of every site in assets/js/projects.js and saves it to
// assets/img/projects/<domain>.jpg. Existing images are kept unless REFRESH=true.
// Run by .github/workflows/screenshots.yml.
import fs from "node:fs";
import vm from "node:vm";
import { chromium } from "playwright";

const OUT_DIR = "assets/img/projects";
const refresh = process.env.REFRESH === "true";

const ctx = {};
vm.runInNewContext(fs.readFileSync("assets/js/projects.js", "utf8") + "\nthis.PROJECTS = PROJECTS;", ctx);

// Must match slugOf() in assets/js/main.js
const slugOf = (url) => new URL(url).hostname.replace(/^www\./, "").replace(/\./g, "-");

fs.mkdirSync(OUT_DIR, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 960 },
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
});

let failed = 0;
for (const project of ctx.PROJECTS) {
  const file = `${OUT_DIR}/${slugOf(project.url)}.jpg`;
  if (!refresh && fs.existsSync(file)) {
    console.log(`skip  ${project.url} (already have ${file})`);
    continue;
  }
  const page = await context.newPage();
  try {
    await page.goto(project.url, { waitUntil: "networkidle", timeout: 60000 }).catch(async () => {
      await page.goto(project.url, { waitUntil: "load", timeout: 60000 });
    });
    // Let preloaders, sliders and entrance animations finish.
    await page.waitForTimeout(5000);
    await page.screenshot({ path: file, type: "jpeg", quality: 72 });
    console.log(`saved ${project.url} -> ${file}`);
  } catch (err) {
    failed += 1;
    console.log(`FAIL  ${project.url}: ${err.message.split("\n")[0]}`);
  } finally {
    await page.close();
  }
}
await browser.close();
console.log(`done, ${failed} failed`);
