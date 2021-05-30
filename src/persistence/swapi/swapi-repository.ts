import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { IPlanetaInfoRepository } from 'src/domain/planeta/Iplaneta-info-repository';

@Injectable()
export class SwapiRepository implements IPlanetaInfoRepository{
    private readonly swapiUrl: string;
    private readonly swapiPlanetPath: string = 'planets'

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.swapiUrl = this.configService.get('SWAPI_URL');
    }

    async getPlanetaFilmesByNome(nome: string): Promise<number> {

        const url = this.swapiUrl.endsWith('/') ? 
            `${this.swapiUrl}${this.swapiPlanetPath}` :
            `${this.swapiUrl}/${this.swapiPlanetPath}`
        ;
        const params = {
            search: nome
        }

        return new Promise<number>((resolve, reject) => {
            this.httpService.get(url, { params }).subscribe(
                res => {
                    if (res.data?.count === 0) return resolve(0)
                    if (res.data.count > 1) return resolve(0);
                    resolve(res.data.results[0].films.length);
                },
                err => {
                    reject(err)
                },
            )
        })
    }
}