import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Character, CharacterSchema} from "../common/schemas/character.schema";
import {Trip, TripSchema} from "../common/schemas/trip.schema";
import {HttpModule} from "@nestjs/axios";
import {Car, CarSchema} from "../common/schemas/car.schema";

@Module({
  imports: [HttpModule,
    MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema },
      { name: Trip.name, schema: TripSchema }, { name: Car.name, schema: CarSchema }])],
  providers: [TripService],
  controllers: [TripController]
})
export class TripModule {}
