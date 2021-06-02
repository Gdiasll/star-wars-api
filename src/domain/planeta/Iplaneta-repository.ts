import { Observable } from 'rxjs';
import { Planeta } from './planeta';

export interface IPlanetaRepository {
    GetAll(skip?: number, limit?: number): Observable<Planeta[]>;
    GetByNome(planetaNome: string): Observable<Planeta>;
    GetById(planetaId: string): Observable<Planeta>;
    DeleteById(planetaId: string): Observable<Planeta>;
    Create(planeta: Planeta): Observable<Planeta>;
}