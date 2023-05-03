import express from 'express';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = 3001;
const isProd = process.env.NODE_ENV === 'production';
const resolve = (str: string) => path.resolve(__dirname, str);
const app = express();

const vite = isProd
  ? null
  : await createServer({
      appType: 'custom',
      server: {
        middlewareMode: true,
      },
    });
if (vite) {
  app.use(vite.middlewares);
} else {
  app.use(
    express.static(resolve('../dist/client'), {
      index: false,
      maxAge: '30d',
    })
  );
}

app.use('*', async (req: Request, res: Response) => {
  if (vite) {
    const { render } = await vite.ssrLoadModule('src/entry-server.tsx');
    const assetMap = { script: 'src/main.tsx' };
    render(req, res, assetMap);
  } else {
    const { render } = await import('../dist/server/entry-server.js');
    const script =
      '/assets/' +
      fs
        .readdirSync(resolve('../dist/client/assets'))
        .filter((scr) => scr.endsWith('js'));
    const style =
      '/assets/' +
      fs
        .readdirSync(resolve('../dist/client/assets'))
        .filter((style) => style.endsWith('css'));
    const assetMap = { style, script };
    render(req, res, assetMap);
  }
});

app.listen(PORT, () => {
  console.log('http://localhost:3001/');
});
