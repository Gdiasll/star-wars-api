import { Connection } from 'mongoose';
import { createPlanetaModel } from './../persistence/planeta/planeta-entity';
import {
  PLANETA_MODEL,
  DATABASE_CONNECTION,

} from './database.constants';

export const databaseModelsProviders = [
  {
    provide: PLANETA_MODEL,
    useFactory: (connection: Connection) => createPlanetaModel(connection),
    inject: [DATABASE_CONNECTION],
  },
];