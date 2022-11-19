import {BadRequestException, Injectable} from '@nestjs/common';
import {
    CreateCharacterDto,
    CreateCharacterReturnDto,
    EditLocationDto,
    EditLocationReturnDto,
    GetCharacterReturnDto
} from "./character.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Character, CharacterDocument} from "../common/schemas/character.schema";
import {plainToClass} from "class-transformer";
import {CharacterState} from "./character.interface";

@Injectable()
export class CharacterService {
    constructor(@InjectModel(Character.name) private characterModel: Model<CharacterDocument>) {}

    public async getAll(): Promise<GetCharacterReturnDto[]> {
        const timeout = Date.now() - 3000;
        const models = await this.characterModel.find({ lastUpdated : { $gt : timeout }}).lean();
        return models.map(model => plainToClass(GetCharacterReturnDto, model, { excludeExtraneousValues: true }));
    }

    public async get(id: string): Promise<GetCharacterReturnDto> {
        const model = await this.characterModel.findOne({ _id: id});
        if(!model) throw new BadRequestException("Object with the id doesn't exist");
        return plainToClass(GetCharacterReturnDto, model);
    }

    public async create(dto : CreateCharacterDto): Promise<CreateCharacterReturnDto> {
        const createdCharacter = new this.characterModel({
            name: dto.name,
            position: dto.position,
            state: CharacterState.Roam,
            lastUpdated: Date.now()
        });
        const result = await createdCharacter.save()
        return result._id;
    }

    public async editLocation(dto: EditLocationDto) : Promise<EditLocationReturnDto> {
        const model = await this.characterModel.findOne({ _id: dto.characterId}).exec();
        if(!model) throw new BadRequestException("Object with the id doesn't exist");
        model.position = dto.position;
        model.bearing = dto.bearing;
        model.lastUpdated = Date.now();
        await model.save();
        return { success: true };
    }
}
