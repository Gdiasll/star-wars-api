import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IPlanetaRepository } from '../../domain/planeta/Iplaneta-repository';
import { Planeta } from '../../domain/planeta/planeta';
import { IPlanetaEntity } from './planeta-entity';
import { PLANETA_MODEL } from 'src/database/database.constants';

@Injectable()
export class PlanetaRepository implements IPlanetaRepository {
  constructor(
    @Inject(PLANETA_MODEL) private planeta: Model<IPlanetaEntity>,
  ) {}

  public Create(planeta: IPlanetaEntity): Promise<Planeta> {

    return new Promise<IPlanetaEntity>((resolve, reject) => {
      this.planeta.create(planeta, (err: any, result: IPlanetaEntity) => {
        if (err) reject(err);
        resolve(result);
      })
    })
  }

  public GetAll(): Promise<Planeta[]> {
    return new Promise<IPlanetaEntity[]>((resolve, reject) => {
      this.planeta.find((err: any, result: IPlanetaEntity[]) => {
        if (err) reject(err);
        resolve(result);
      })
    })
  }

  public GetById(id: string): Promise<Planeta> {
    return new Promise<IPlanetaEntity>((resolve, reject) => {
      this.planeta.findById(id, (err: any, result: IPlanetaEntity) => {
        if (err) reject(err);
        resolve(result);
      })
    })
  }

  public GetByNome(nome: string): Promise<Planeta> {
    return new Promise<IPlanetaEntity>((resolve, reject) => {
      this.planeta.findOne({ nome }, (err: any, result: IPlanetaEntity) => {
        if (err) reject(err);
        resolve(result);
      })
    })
  }

  public DeleteById(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.planeta.deleteOne({ _id: id }, (err: any) => {
        if (err) reject(err);
        resolve();
      })
    })
  }

}
