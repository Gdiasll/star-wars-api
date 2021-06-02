import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { PlanetaService } from './planeta.service';
import { PlanetaRepository } from 'src/persistence/planeta/planeta-repository';
import { SwapiRepository } from 'src/persistence/swapi/swapi-repository';

describe('PlanetaService', () => {
  let service: PlanetaService;
  let planetaRepository: PlanetaRepository;
  let swapiRepository: SwapiRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            PlanetaService,
            {
                provide: 'PlanetaRepo',
                useValue: {
                    Create: jest.fn(),
                    GetByNome: jest.fn(),
                    GetAll: jest.fn(),
                    GetById: jest.fn(),
                    DeleteById: jest.fn(),
                }
            },
            {
                provide: 'SwapiRepo',
                useValue: {
                    GetPlanetaFilmesByNome: jest.fn()
                }
            }
        ]
    }).compile();
    service = module.get<PlanetaService>(PlanetaService);
    planetaRepository = module.get<PlanetaRepository>('PlanetaRepo');
    swapiRepository = module.get<SwapiRepository>('SwapiRepo');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Create ', async () => {
    const sampleData = {
        nome: 'Marte',
        clima: 'árido',
        terreno: 'montanhoso',
        filmes: 0
    }

    const saveSpy = jest.spyOn(planetaRepository, 'Create').mockImplementation(() => of({
      _id: '123',
      ...sampleData
    } as any));

    const infoSpy = jest.spyOn(swapiRepository, 'GetPlanetaFilmesByNome').mockImplementationOnce(() => Promise.resolve(3));

    const result = await service.Create(sampleData);
    expect(saveSpy).toBeCalledWith(sampleData);
    expect(infoSpy).toBeCalledWith(sampleData.nome);
    expect(result._id).toBeDefined();
  });

  it('GetAll should return all planeta', async () => {
    const planetas = [
      {
        _id: '5ee49c3115a4e75254bb732e',
        nome: 'Marte',
        clima: 'árido',
        terreno: 'montanhoso',
        filmes: 0
      }
    ];
    jest.spyOn(planetaRepository, 'GetAll').mockImplementation(() => of(planetas));

    const data = await service.GetAll(0, 10);
    expect(data.length).toBe(1);
    expect(planetaRepository.GetAll).toHaveBeenCalled();
  });

  it('GetByNome should return planeta', async () => {
    jest
      .spyOn(planetaRepository, 'GetByNome')
      .mockImplementation(() => of({
        nome: 'Marte',
        clima: 'árido',
        terreno: 'montanhoso',
        filmes: 0
    }));

    const foundPlaneta = await service.GetByNome('Marte');
    expect(foundPlaneta).toEqual({
      nome: 'Marte',
      clima: 'árido',
      terreno: 'montanhoso',
      filmes: 0
    });
    expect(planetaRepository.GetByNome).lastCalledWith('Marte');
  });

  describe('getById', () => {

    it('return one result', async () => {

        let planeta = {
            _id: '123',
            nome: 'Marte',
            clima: 'árido',
            terreno: 'montanhoso',
            filmes: 0
        }

        jest.spyOn(planetaRepository, 'GetById').mockImplementation(() => of(planeta));

      const foundUser = await service.GetById('123');
      expect(foundUser).toEqual({
        _id: '123',
        nome: 'Marte',
        clima: 'árido',
        terreno: 'montanhoso',
        filmes: 0
      });
      expect(planetaRepository.GetById).toBeCalledWith('123');
    });

    it('return a null result', async () => {
      jest.spyOn(planetaRepository, 'GetById').mockImplementation(() => of(null))

      try {
        await service.GetById('245125451436');
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
  });
});
