import { Planeta } from './planeta';

export interface IPlanetaRepository {
    GetAll(): Promise<Planeta[]>;
    GetByNome(planetaNome: string): Promise<Planeta>;
    GetById(planetaId: string): Promise<Planeta>;
    DeleteById(planetaId: string): Promise<void>;
    Create(planeta: Planeta): Promise<Planeta>;
}