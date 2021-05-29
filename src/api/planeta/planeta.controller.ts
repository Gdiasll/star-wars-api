import { Body, Controller, Delete, Get, HttpCode, Param, Post, Res } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreatePlanetaDto } from './create-planeta.dto';
import { Response } from 'express';
import { Planeta } from 'src/database/planeta.model';

@Controller('planeta')
export class PlanetaController {

    @Post('')
    @HttpCode(201)
    createPlaneta(
        @Body() planeta: CreatePlanetaDto,
        @Res() res: Response,
    ): Observable<Response> {
        return;
    }

    @Get('')
    @HttpCode(200)
    getAllPlaneta(): Observable<Planeta[]> {
        return;
    }

    @Get(':id')
    @HttpCode(200)
    getPlanetaById(@Param('id') id: string): Observable<Planeta> {
        return;
    }

    @Get(':nome')
    @HttpCode(200)
    getPlanetaByName(@Param('nome') nome: string): Observable<Planeta> {
        return;
    }

    @Delete(':id')
    @HttpCode(204)
    deletePlaneta(@Param('id') id: string): Observable<Response> {
        return;
    }
}
