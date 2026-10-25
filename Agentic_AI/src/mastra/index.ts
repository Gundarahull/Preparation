import * as dotenv from 'dotenv';
dotenv.config(); // 👈 This line loads your key into memory

import { Mastra } from '@mastra/core'
import bmtcAgent from './agents/test-agent.js'
import { DuckDBStore } from '@mastra/duckdb';
import { MastraCompositeStore } from '@mastra/core/storage';
import { LibSQLStore } from '@mastra/libsql';
import { MastraPlatformExporter, MastraStorageExporter, Observability, SensitiveDataFilter } from '@mastra/observability';

const observabilitySTore = await new DuckDBStore().getStore('observability') // for metrics and traces

export const mastra = new Mastra({
    storage: new MastraCompositeStore({
        id: 'composite-store',
        default: new LibSQLStore({
            id: 'mastra-storage',
            url: 'file:./mastra.db',
        }),
        domains: {
            observability: await new DuckDBStore().getStore('observability'),
        },

    }),
    observability: new Observability({
        configs: {
            default: {
                serviceName: 'something fishy',
                exporters: [
                    new MastraStorageExporter(), // Persists observability events to Mastra Storage
                    new MastraPlatformExporter(), // Sends observability events to Mastra platform (if MASTRA_PLATFORM_ACCESS_TOKEN is set)
                ],
                spanOutputProcessors: [
                    new SensitiveDataFilter(), // Redacts sensitive data like passwords, tokens, keys
                ],
            },

        }
    }),
    agents: { bmtcAgent }
})