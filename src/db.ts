import Knex from 'knex';
import { config } from './config';
const instance: Knex = Knex(config.knex as Knex.Config);
export default instance;
