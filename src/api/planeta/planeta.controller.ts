import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post } from '@nestjs/common';
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
    async getPlanetaById(@Param('id') id: string): Promise<Planeta> {
        const planeta: Planeta = await this.planetaService.GetById(id);
        if (!planeta) throw new NotFoundException('Planeta não encontrado.');
        return planeta;
    }

    @Get('/nome/:nome')
    @HttpCode(200)
    async getPlanetaByName(@Param('nome') nome: string): Promise<Planeta> {
        const planeta: Planeta = await this.planetaService.GetByNome(nome);
        if (!planeta) throw new NotFoundException('Planeta não encontrado.');
        return planeta;
    }

    @Delete(':id')
    @HttpCode(204)
    async deletePlaneta(@Param('id') id: string): Promise<void> {
        const planeta: Planeta = await this.planetaService.GetById(id);
        if (!planeta) throw new NotFoundException('Planeta não encontrado.');
        return this.planetaService.DeleteById(id);
    }
}
