import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  dbServer: process.env.DB_SERVER,
  dbPort: process.env.DB_PORT,
  dbDatabase: process.env.DB_DATABASE,
}));
