import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { PLANETA_MODEL } from 'src/database/database.constants';
import { IPlanetaRepository } from '../../domain/planeta/Iplaneta-repository';
import { Planeta } from '../../domain/planeta/planeta';
import { IPlanetaEntity } from './planeta-entity';
import { from, Observable, EMPTY, of } from 'rxjs';
import { mergeMap, throwIfEmpty } from 'rxjs/operators';

@Injectable()
export class PlanetaRepository implements IPlanetaRepository {
  constructor(
    @Inject(PLANETA_MODEL) private planeta: Model<IPlanetaEntity>,
  ) {}

  public Create(planeta: Planeta): Observable<Planeta> {
    return from(this.ExistsByNome(planeta.nome).pipe(
      mergeMap((exists) => {
        if (exists)
          throw new ConflictException(`nome: ${planeta.nome} já existe`);
        return this.planeta.create(planeta);
      }),
    ))
  }

  public GetAll(skip = 0, limit = 10): Observable<Planeta[]> {
    return from(this.planeta.find().skip(skip).limit(limit).exec());
  }

  public GetById(id: string): Observable<Planeta> {
    return from(this.planeta.findOne({ _id: id }).exec()).pipe(
      mergeMap((p) => (p ? of(p) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`planeta_id: ${id} não encontrado`)),
    );
  }

  public GetByNome(nome: string): Observable<Planeta> {
    return from(this.planeta.findOne({ nome }).exec()).pipe(
      mergeMap((p) => (p ? of(p) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`planeta: ${nome} não encontrado`)),
    );
  }

  public DeleteById(id: string): Observable<Planeta> {
    return from(this.planeta.findOneAndDelete({ _id: id }).exec()).pipe(
      mergeMap((p) => (p ? of(p) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`planeta_id: ${id} não encontrado`)),
    );
  }

  public ExistsByNome(nome: string): Observable<boolean> {
    return from(this.planeta.exists({ nome }));
  }

}
