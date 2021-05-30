
export interface IPlanetaInfoRepository {
    getPlanetaFilmesByNome(nome: string): Promise<number>;
}