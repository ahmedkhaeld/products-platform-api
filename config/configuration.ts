import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  appName: process.env.APP,
  nodeEnv: process.env.NODE_ENV,
  postgres: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    pass: process.env.PG_PASS,
    db: process.env.PG_NAME,
  },
});
