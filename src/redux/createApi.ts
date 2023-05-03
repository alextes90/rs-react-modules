import * as ToolkitRaw from '@reduxjs/toolkit/dist/query/react/index.js';

type TypeQuery = typeof ToolkitRaw & { default?: unknown };
const { buildCreateApi, coreModule, reactHooksModule } = ((
  ToolkitRaw as TypeQuery
).default ?? ToolkitRaw) as typeof ToolkitRaw;

const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
);

export default createApi;
