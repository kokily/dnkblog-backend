import dotenv from 'dotenv';
import path from 'path';
import { isProd } from './constants';

dotenv.config({
  path: path.resolve(process.cwd(), isProd ? '.env' : '.env.test'),
});
