import assert from 'node:assert/strict';
import {readFileSync, existsSync, readdirSync} from 'node:fs';
import {resolve, join, extname} from 'node:path';

const root = resolve(process.argv[2] || 'docs');
const base = '/rovny-hod';
const files = readdirSync(root, {recursive:true}).filter(f => f.endsWith('.html'));
assert(files.length > 0, 'No exported HTML pages');
let checked = 0;
for (const file of files) {
  const html = readFileSync(join(root, file), 'utf8');
  for (const match of html.matchAll(/(?:href|src)="(\/[^"\s]*)"/g)) {
    const url = match[1].replaceAll('&amp;', '&');
    if (url.startsWith('//')) continue;
    assert(url.startsWith(base + '/') || url === base, `${file}: URL outside project path: ${url}`);
    const path = decodeURIComponent(url.slice(base.length).split(/[?#]/)[0]);
    const target = join(root, path);
    assert(existsSync(target) || (!extname(path) && existsSync(join(target, 'index.html'))), `${file}: missing target: ${url}`);
    checked++;
  }
}
for (const path of ['index.html','services/index.html','cart/index.html','checkout/index.html','demo-success/index.html']) {
  assert(existsSync(join(root, path)), `Missing page ${path}`);
}
assert(readFileSync(join(root, 'index.html'),'utf8').includes('Ремонт и обслуживание'), 'Home page must contain site content');
console.log(`Pages export verified: ${files.length} HTML files, ${checked} local references`);
