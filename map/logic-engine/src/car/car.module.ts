import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Car, CarSchema} from "../common/schemas/car.schema";
import {HttpModule} from "@nestjs/axios";
import {Character, CharacterSchema} from "../common/schemas/character.schema";
import {Trip, TripSchema} from "../common/schemas/trip.schema";

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema },
    { name: Trip.name, schema: TripSchema }, { name: Car.name, schema: CarSchema }])],
  providers: [CarService],
  controllers: [CarController]
})
export class CarModule {}
