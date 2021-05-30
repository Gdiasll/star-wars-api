import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreatePlanetaDto } from './create-planeta.dto';
import { PlanetaService } from '../../domain/planeta/planeta.service';
import { Planeta } from 'src/domain/planeta/planeta';
import { ApiTags } from '@nestjs/swagger';

@Controller('planeta')
@ApiTags('Planeta')
export class PlanetaController {

    constructor(
        private readonly planetaService: PlanetaService
    ) {}

    @Post('')
    @HttpCode(201)
    public async createPlaneta(
        @Body() planeta: CreatePlanetaDto,
    ): Promise<Planeta> {
        return this.planetaService.Create(planeta);
    }

    @Get('')
    @HttpCode(200)
    getAllPlaneta(): Promise<Planeta[]> {
        return this.planetaService.GetAll();
    }

    @Get(':id')
    @HttpCode(200)
    getPlanetaById(@Param('id') id: string): Promise<Planeta> {
        return this.planetaService.GetById(id);
    }

    @Get(':nome')
    @HttpCode(200)
    getPlanetaByName(@Param('nome') nome: string): Promise<Planeta> {
        return this.planetaService.GetByNome(nome);
    }

    @Delete(':id')
    @HttpCode(204)
    deletePlaneta(@Param('id') id: string): Promise<void> {
        return this.planetaService.DeleteById(id);
    }
}
