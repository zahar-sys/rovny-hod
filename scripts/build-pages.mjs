import {execFileSync} from 'node:child_process';
import {cpSync, readdirSync, writeFileSync} from 'node:fs';

execFileSync('npm', ['--prefix','demo-site','run','build'], {stdio:'inherit'});
for (const name of readdirSync('demo-site/out')) {
  cpSync(`demo-site/out/${name}`, `docs/${name}`, {recursive:true});
}
writeFileSync('docs/.nojekyll', '');
execFileSync(process.execPath, ['scripts/verify-pages.mjs'], {stdio:'inherit'});
