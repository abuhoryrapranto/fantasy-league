import { IsNotEmpty } from "class-validator";

export class GameDto {

    @IsNotEmpty({message: "Name can't be empty."})
    name: string;

    logo: string;

    isActive: boolean;
}