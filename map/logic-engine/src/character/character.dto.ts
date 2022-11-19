import {
    CharacterState,
    CreateCharacter,
    CreateCharacterReturn,
    EditLocation, EditLocationReturn,
    GetCharacterReturn
} from "./character.interface";
import {ApiProperty} from "@nestjs/swagger";
import {Position} from "../common/interfaces/position.interface";
import {Expose, Transform} from "class-transformer";

export class GetCharacterReturnDto implements GetCharacterReturn {
    @Expose()
    @Transform(({value, key, obj, type}) => `${obj._id}`)
    @ApiProperty()
    readonly id: string;

    @Expose()
    @ApiProperty()
    readonly name: string;

    @Expose()
    @ApiProperty()
    readonly state: CharacterState;

    @Expose()
    @ApiProperty()
    readonly position: Position

    @Expose()
    @ApiProperty()
    readonly bearing: number;

}

export class CreateCharacterDto implements CreateCharacter {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly position: Position;

    @ApiProperty()
    readonly bearing: number;
}

export class CreateCharacterReturnDto implements CreateCharacterReturn {
    @ApiProperty()
    readonly id: string;

}

export class EditLocationDto implements EditLocation {
    @ApiProperty()
    readonly characterId: string;

    @ApiProperty()
    readonly position: Position;

    @ApiProperty()
    readonly bearing: number;
}

export class EditLocationReturnDto implements EditLocationReturn {
    @ApiProperty()
    readonly success: boolean
}