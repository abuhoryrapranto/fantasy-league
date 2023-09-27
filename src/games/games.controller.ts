import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './game.entity';
import { GameDto } from './dto/game.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

@Controller('api/games')
export class GamesController {

    constructor(private gameService: GamesService){}

    @Get('/')
    @UseInterceptors(TransformInterceptor)
    async getAllGames() : Promise<Game[]> {
        const data = await this.gameService.findAll();
        if(!data) throw new HttpException('Games not found', HttpStatus.NOT_FOUND)
        return data;
    }

    @Post('/save')
    @UsePipes(ValidationPipe)
    @UseInterceptors(TransformInterceptor)
    async saveGame(@Body() dto : GameDto) : Promise<Game> {
        const save = await this.gameService.save(dto);
        if(!save) throw new HttpException('Games not saved successfully.', HttpStatus.BAD_REQUEST)
        return save;
    }
}
