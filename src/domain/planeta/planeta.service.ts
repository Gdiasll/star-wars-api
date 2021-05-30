import { Injectable, Inject } from '@nestjs/common';
import { Planeta } from './planeta';
import { IPlanetaRepository } from './Iplaneta-repository';

const PlanetaRepo = () => Inject('PlanetaRepo');


@Injectable()
export class PlanetaService {
    constructor(
        @PlanetaRepo() private readonly planetaRepository: IPlanetaRepository
    ){}

    private async getQuantidadeFilmes(planetaNome: string): Promise<number> {
        return 0;
    }

    public async Create(toCreate: Planeta): Promise<Planeta> {

        toCreate.filmes = await this.getQuantidadeFilmes(toCreate.nome);
        return this.planetaRepository.Create(toCreate);
    }

    public async GetAll(): Promise<Planeta[]> {
        return this.planetaRepository.GetAll();
    }

    public async GetById(id: string): Promise<Planeta> {
        return this.planetaRepository.GetById(id);
    }

    public async GetByNome(nome: string): Promise<Planeta> {
        return this.planetaRepository.GetByNome(nome);
    }

    public async DeleteById(id: string): Promise<void> {
        return this.planetaRepository.DeleteById(id);
    }
}