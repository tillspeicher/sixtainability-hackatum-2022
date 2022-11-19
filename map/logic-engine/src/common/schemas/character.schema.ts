import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {CharacterState} from "../../character/character.interface";
import {Position} from "../interfaces/position.interface";

export type CharacterDocument = Character & Document;

@Schema()
export class Character {

    @Prop()
    name: string;

    @Prop()
    state: CharacterState;

    @Prop({ type: {}})
    position: Position

    @Prop()
    bearing: number;

    @Prop()
    lastUpdated: number;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);