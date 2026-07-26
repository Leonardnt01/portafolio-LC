import { cp, mkdir, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const projectRoot = new URL('..', import.meta.url);
const distDirectory = new URL('../dist/', import.meta.url);
const clientDirectory = new URL('../dist/client/', import.meta.url);
const serverDirectory = new URL('../dist/server/', import.meta.url);

await mkdir(clientDirectory, { recursive: true });
await mkdir(serverDirectory, { recursive: true });

const entries = await readdir(distDirectory, { withFileTypes: true });

for (const entry of entries) {
  if (entry.name === 'client' || entry.name === 'server') {
    continue;
  }

  await cp(
    new URL(`../dist/${entry.name}`, import.meta.url),
    new URL(`../dist/client/${entry.name}`, import.meta.url),
    { recursive: true },
  );
}

const worker = `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);

    if (response.status === 404 && !url.pathname.includes('.')) {
      response = await env.ASSETS.fetch(new Request(new URL('/index.html', url), request));
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      const html = await response.text();
      const absoluteHtml = html.replaceAll('content="/og.png"', \`content="\${url.origin}/og.png"\`);
      return new Response(absoluteHtml, response);
    }

    return response;
  },
};
`;

await writeFile(new URL('../dist/server/index.js', import.meta.url), worker, 'utf8');

console.log(`Sites bundle staged from ${join(projectRoot.pathname, 'dist')}`);
