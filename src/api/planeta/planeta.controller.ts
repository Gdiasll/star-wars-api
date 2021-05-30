import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreatePlanetaDto } from './create-planeta.dto';
import { Response } from 'express';
import { IPlanetaEntity } from 'src/persistence/planeta/planeta-entity';
import { PlanetaService } from '../../domain/planeta/planeta.service';
import { Planeta } from 'src/domain/planeta/planeta';

@Controller('planeta')
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
