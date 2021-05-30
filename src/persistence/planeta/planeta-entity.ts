import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';

interface IPlanetaEntity extends Document {
  readonly id: string;
  readonly nome: string;
  readonly clima: string;
  readonly terreno: string;
  readonly filmes: number;
}

type PlanetaModel = Model<IPlanetaEntity>;

export const PlanetaSchema = new Schema(
  {
    _id: { type: SchemaTypes.ObjectId, required: true, auto: true },
    nome: { type: SchemaTypes.String, required: true },
    clima: { type: SchemaTypes.String, required: true },
    terreno: { type: SchemaTypes.String, required: true },
    filmes: { type: SchemaTypes.Number, required: true },

  },
  { timestamps: false },
);

const createPlanetaModel: (conn: Connection) => PlanetaModel = (
  connection: Connection,
) => connection.model<IPlanetaEntity>('Planeta', PlanetaSchema, 'planetas');

export { IPlanetaEntity, PlanetaModel, createPlanetaModel };