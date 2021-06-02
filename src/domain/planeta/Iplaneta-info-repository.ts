
export interface IPlanetaInfoRepository {
    GetPlanetaFilmesByNome(nome: string): Promise<number>;
}