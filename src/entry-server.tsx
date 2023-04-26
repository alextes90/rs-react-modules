import { Request, Response } from 'express';
import { StaticRouter } from 'react-router-dom/server';
import { renderToPipeableStream } from 'react-dom/server';
import { Provider } from 'react-redux';
import { setupStore } from './redux/store';
import mortyApi from './redux/mortyService';
import AppRoutes from './AppRoutes';

const store = setupStore();

interface AssetMap {
  style: string;
  script: string;
}

async function render(req: Request, res: Response, assetMap: AssetMap) {
  await Promise.all(store.dispatch(mortyApi.util.getRunningQueriesThunk()));
  const preloadedState = store.getState();

  const { pipe } = renderToPipeableStream(
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          {assetMap?.style && <link rel="stylesheet" href={assetMap.style} />}
        </head>
        <body>
          <div id="root">
            <Provider store={store}>
              <StaticRouter location={req.originalUrl}>
                <AppRoutes />
              </StaticRouter>
            </Provider>
          </div>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(
                preloadedState
              ).replace(/</g, '\\u003c')}`,
            }}
          />
        </body>
      </html>
    </>,
    {
      onShellReady() {
        pipe(res);
      },
      onAllReady() {
        res.end();
      },
      bootstrapModules: [assetMap.script],
    }
  );
}

export { render };
