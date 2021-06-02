import { Test, TestingModule } from '@nestjs/testing';
import { PlanetaService } from 'src/domain/planeta/planeta.service';
import { PlanetaController } from './planeta.controller';

describe('PlanetaController', () => {
  let controller: PlanetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetaController],
      providers: [
        {
          provide: PlanetaService,
          useValue: {
            
          }
        }
      ]
    }).compile();

    controller = module.get<PlanetaController>(PlanetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
