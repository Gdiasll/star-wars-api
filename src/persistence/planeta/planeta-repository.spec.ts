import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { PlanetaRepository } from './planeta-repository';
import { IPlanetaEntity } from './planeta-entity';
import { PLANETA_MODEL } from 'src/database/database.constants';
import { of } from 'rxjs';

describe('PlanetaRepository', () => {
  let repository: PlanetaRepository;
  let model: Model<IPlanetaEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetaRepository,
        {
          provide: PLANETA_MODEL,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndDelete: jest.fn(),
            exists: jest.fn(),
            create: jest.fn()
          },
        },
      ],
    }).compile();
    repository = module.get<PlanetaRepository>(PlanetaRepository);
    model = module.get<Model<IPlanetaEntity>>(PLANETA_MODEL);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('Create ', async () => {
    const sampleData = {
        nome: 'Marte',
        clima: 'árido',
        terreno: 'montanhoso',
        filmes: 0
    }

    const existsByNomeSpy = jest.spyOn(repository, 'ExistsByNome').mockReturnValue(of(false));
    const saveSpy = jest.spyOn(model, 'create').mockImplementation(() => Promise.resolve({
      _id: '123',
      ...sampleData
    } as any));

    const pipeMock = {
      pipe: jest.fn()
    }
    const result = await repository.Create(sampleData).toPromise();
    expect(existsByNomeSpy).toBeCalled();
    expect(saveSpy).toBeCalledWith(sampleData);
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
    jest.spyOn(model, 'find').mockReturnValue({
      skip: jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(planetas) as any,
        }),
      }),
    } as any);

    const data = await repository.GetAll().toPromise();
    expect(data.length).toBe(1);
    expect(model.find).toHaveBeenCalled();
  });

  it('GetByNome should return planeta', async () => {
    jest
      .spyOn(model, 'findOne')
      .mockImplementation((conditions: any, projection: any, options: any) => {
        return {
          exec: jest.fn().mockResolvedValue({
            nome: 'Marte',
            clima: 'árido',
            terreno: 'montanhoso',
            filmes: 0
          } as IPlanetaEntity),
        } as any;
      });

    const foundPlaneta = await repository.GetByNome('Marte').toPromise();
    expect(foundPlaneta).toEqual({
      nome: 'Marte',
      clima: 'árido',
      terreno: 'montanhoso',
      filmes: 0
    });
    expect(model.findOne).lastCalledWith({ nome: 'Marte' });
    expect(model.findOne).toBeCalledTimes(1);
  });

  describe('getById', () => {

    it('return one result', async () => {
      jest
        .spyOn(model, 'findOne')
        .mockImplementation((conditions: any, projection: any, options: any) => {
          return {
            exec: jest.fn().mockResolvedValue({
              _id: '123',
              nome: 'Marte',
              clima: 'árido',
              terreno: 'montanhoso',
              filmes: 0
            } as IPlanetaEntity),
          } as any;
        });

      const foundUser = await repository.GetById('123').toPromise();
      expect(foundUser).toEqual({
        _id: '123',
        nome: 'Marte',
        clima: 'árido',
        terreno: 'montanhoso',
        filmes: 0
      });
      expect(model.findOne).lastCalledWith({ _id: '123' });
      expect(model.findOne).toBeCalledTimes(1);
    });

    it('return a null result', async () => {
      jest
        .spyOn(model, 'findOne')
        .mockImplementation((conditions: any, projection: any, options: any) => {
          return {
            exec: jest.fn().mockResolvedValue(null) as any,
          } as any;
        });

      try {
        await repository.GetById('245125451436').toPromise();
      } catch (e) {
        expect(e).toBeDefined();
      }
    });

    describe('DeleteById', () => {
      it('perform delete if planeta exists', (done) => {
        const toDeleted = {
          _id: '5ee49c3115a4e75254bb732e',
          nome: 'Venus',
          clima: 'gasoso',
          terreno: '-',
          filmes: 3
        };
        jest.spyOn(model, 'findOneAndDelete').mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(toDeleted),
        } as any);
  
        repository.DeleteById('anystring').subscribe({
          next: (data) => {
            expect(data).toBeTruthy();
            expect(model.findOneAndDelete).toBeCalled();
          },
          error: (error) => console.log(error),
          complete: done(),
        });
      });
  
      it('throw an NotFoundException if planeta not exists', (done) => {
        jest.spyOn(model, 'findOneAndDelete').mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        } as any);
        repository.DeleteById('anystring').subscribe({
          error: (error) => {
            expect(error).toBeDefined();
            expect(model.findOneAndDelete).toBeCalledTimes(1);
          },
          complete: done(),
        });
      });
    });

  });
});
