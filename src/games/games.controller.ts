import { Body, Controller, Get, HttpCode, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './game.entity';
import { GameDto } from './dto/game.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

@Controller('api/games')
export class GamesController {

    constructor(private gameService: GamesService){}

    @Get('/')
    @HttpCode(200)
    @UseInterceptors(TransformInterceptor)
    async getAllGames() : Promise<Game[]> {
        return this.gameService.findAll();
    }

    @Post('/save')
    @HttpCode(201)
    @UsePipes(ValidationPipe)
    @UseInterceptors(TransformInterceptor)
    async saveGame(@Body() dto : GameDto) : Promise<Game> {
        return this.gameService.save(dto);
    }
}
