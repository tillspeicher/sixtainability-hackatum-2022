import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {CharacterService} from "./character.service";
import {
    CreateCharacterDto,
    CreateCharacterReturnDto, EditLocationDto,
    EditLocationReturnDto,
    GetCharacterReturnDto
} from "./character.dto";
import {ApiOkResponse, ApiResponse} from "@nestjs/swagger";

@Controller('character')
export class CharacterController {
    constructor(private characterService: CharacterService) {}

    @ApiResponse({ status: 201, type:[GetCharacterReturnDto] })
    @Get()
    async getAll(): Promise<GetCharacterReturnDto[]> {
        return this.characterService.getAll();
    }

    @ApiResponse({ status: 201, type: GetCharacterReturnDto})
    @Get(":id")
    get(@Param("id") id: string): Promise<GetCharacterReturnDto> {
       return this.characterService.get(id);
    }

    @ApiResponse({ status: 201, type: CreateCharacterReturnDto})
    @Post()
    create(@Body() body: CreateCharacterDto ) : Promise<CreateCharacterReturnDto> {
        return this.characterService.create(body);
    }

    @ApiResponse( { status: 201, type: EditLocationReturnDto})
    @Put("location")
    editLocation(@Body() body: EditLocationDto): Promise<EditLocationReturnDto> {
        return this.characterService.editLocation(body);
    }
}
