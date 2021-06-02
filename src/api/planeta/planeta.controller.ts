import { BadRequestException, Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreatePlanetaDto } from './create-planeta.dto';
import { PlanetaService } from '../../domain/planeta/planeta.service';
import { Planeta } from 'src/domain/planeta/planeta';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/utils/pipe/parse-object-id.pipe';

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
    getAllPlaneta(
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
    ): Promise<Planeta[]> {
        return this.planetaService.GetAll(skip, limit);
    }

    @Get(':id')
    @HttpCode(200)
    async getPlanetaById(@Param('id', ParseObjectIdPipe) id: string): Promise<Planeta> {
        return this.planetaService.GetById(id);
    }

    @Get('/nome/:nome')
    @HttpCode(200)
    async getPlanetaByName(@Param('nome') nome: string): Promise<Planeta> {
        return this.planetaService.GetByNome(nome);
    }

    @Delete(':id')
    @HttpCode(200)
    async deletePlaneta(@Param('id', ParseObjectIdPipe) id: string): Promise<Planeta> {
        return this.planetaService.DeleteById(id);
    }
}
