import { Injectable, Inject } from '@nestjs/common';
import { Planeta } from './planeta';
import { IPlanetaRepository } from './Iplaneta-repository';
import { IPlanetaInfoRepository } from './Iplaneta-info-repository';

const PlanetaRepo = () => Inject('PlanetaRepo');
const SwapiRepo = () => Inject('SwapiRepo');

@Injectable()
export class PlanetaService {
    constructor(
        @PlanetaRepo() private readonly planetaRepository: IPlanetaRepository,
        @SwapiRepo() private readonly planetaInfoRepository: IPlanetaInfoRepository,
    ){}

    private async getQuantidadeFilmes(planetaNome: string): Promise<number> {
        return this.planetaInfoRepository.GetPlanetaFilmesByNome(planetaNome);
    }

    public async Create(toCreate: Planeta): Promise<Planeta> {
        toCreate.filmes = await this.getQuantidadeFilmes(toCreate.nome);
        return this.planetaRepository.Create(toCreate).toPromise();
    }

    public async GetAll(skip?: number, limit?: number): Promise<Planeta[]> {
        return this.planetaRepository.GetAll(skip, limit).toPromise();
    }

    public async GetById(id: string): Promise<Planeta> {
        return this.planetaRepository.GetById(id).toPromise();
    }

    public async GetByNome(nome: string): Promise<Planeta> {
        return this.planetaRepository.GetByNome(nome).toPromise();
    }

    public async DeleteById(id: string): Promise<Planeta> {
        return this.planetaRepository.DeleteById(id).toPromise();
    }
}