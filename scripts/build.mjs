import { mkdir, rm, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
await rm(dist,{recursive:true,force:true}); await mkdir(dist,{recursive:true});
for (const item of ['index.html','about.html','services.html','achievements.html','contact.html','insights.html','privacy.html','insights','assets']) {
  await cp(path.join(root,item),path.join(dist,item),{recursive:true});
}
console.log('Static website built in dist/; API and secrets are not in static output.');
