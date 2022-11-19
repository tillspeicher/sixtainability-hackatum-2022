import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Character, CharacterSchema} from "../common/schemas/character.schema";

@Module({
  providers: [CharacterService],
  controllers: [CharacterController],
  imports: [MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }])]
})
export class CharacterModule {}
