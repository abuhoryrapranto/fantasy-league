import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { Repository } from 'typeorm';
import { GameDto } from './dto/game.dto';

@Injectable()
export class GamesService {

    constructor(
        @InjectRepository(Game)
        private gameRepository: Repository<Game>
    ){}

    async findAll() : Promise<Game[]> {
        return await this.gameRepository.find({where: {isActive: true}})
    }

    async save(dto : GameDto) : Promise<Game> {
        return await this.gameRepository.save(dto);
    }
}
