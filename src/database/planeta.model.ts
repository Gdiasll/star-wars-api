import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';

interface Planeta extends Document {
  readonly id: number;
  readonly nome: string;
  readonly clima: string;
  readonly terreno: string;
  readonly quantidadeFilmes: number;
}

type PlanetaModel = Model<Planeta>;

const PlanetaSchema = new Schema(
  {
    id: SchemaTypes.ObjectId,
    nome: SchemaTypes.String,
    clima: SchemaTypes.String,
    terreno: SchemaTypes.String,
    quantidadeFilmes: SchemaTypes.Number,

  },
  { timestamps: false },
);

const createPlanetaModel: (conn: Connection) => PlanetaModel = (
  connection: Connection,
) => connection.model<Planeta>('Planeta', PlanetaSchema, 'planetas');

export { Planeta, PlanetaModel, createPlanetaModel };