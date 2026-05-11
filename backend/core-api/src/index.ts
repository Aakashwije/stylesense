import { createApp } from './app.js';
import { config } from './config/index.js';

const app = createApp();

const server = app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`[core-api] listening on http://0.0.0.0:${config.port} (${config.nodeEnv})`);
});

function shutdown(signal: string): void {
  // eslint-disable-next-line no-console
  console.log(`[core-api] received ${signal}, shutting down...`);
  server.close(() => process.exit(0));
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
