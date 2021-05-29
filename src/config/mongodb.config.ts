import { registerAs } from '@nestjs/config';

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;

export default registerAs('mongodb', () => ({
  uri: `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
}));