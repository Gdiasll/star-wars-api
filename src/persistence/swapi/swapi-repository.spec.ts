import { ConfigService } from 'src/config/config.service';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { SwapiRepository } from './swapi-repository';
import { HttpService } from '@nestjs/common';

describe('SwapiRepository', () => {
    let repository: SwapiRepository;
    let configService: ConfigService;
    let http: HttpService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SwapiRepository,
                {
                    provide: HttpService,
                    useValue: {
                        get: jest.fn()
                    }
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn()
                    }
                }

            ]
        }).compile();
        repository = module.get<SwapiRepository>(SwapiRepository);
        configService = module.get<ConfigService>(ConfigService);
        http = module.get<HttpService>(HttpService);
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });
})