import 'dotenv/config';
import { z } from 'zod';

const ConfigSchema = z.object({
  nodeEnv: z.enum(['development', 'test', 'production']).default('development'),
  port: z.coerce.number().int().positive().default(4000),
  logLevel: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),

  postgres: z.object({
    host: z.string().default('localhost'),
    port: z.coerce.number().int().positive().default(5432),
    user: z.string().default('stylesense'),
    password: z.string().default('stylesense_dev'),
    database: z.string().default('stylesense'),
  }),

  redis: z.object({
    host: z.string().default('localhost'),
    port: z.coerce.number().int().positive().default(6379),
  }),

  jwt: z.object({
    secret: z.string().min(16, 'JWT_SECRET must be at least 16 characters'),
    accessTtl: z.string().default('15m'),
    refreshTtl: z.string().default('7d'),
  }),
});

export type Config = z.infer<typeof ConfigSchema>;

export const config: Config = ConfigSchema.parse({
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  logLevel: process.env.LOG_LEVEL,
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'dev_secret_replace_me_replace_me',
    accessTtl: process.env.JWT_ACCESS_TTL,
    refreshTtl: process.env.JWT_REFRESH_TTL,
  },
});
